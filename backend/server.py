"""
Standalone Zero-Dependency Python HTTP & SQLite Service
Compatible with standard Python 3.10+ without requiring external pip packages.
Serves the exact same endpoints as the FastAPI app:
- POST /api/contact
- GET /api/contact/health
- GET /api/contact/submissions
Runs on internal port (default: 8000).
"""
import http.server
import json
import os
import re
import socketserver
import sqlite3
import sys
from datetime import datetime

PORT = int(os.environ.get("PYTHON_PORT", 8888))
HOST = os.environ.get("PYTHON_HOST", "127.0.0.1")
DB_PATH = os.environ.get("SQLITE_DB_PATH", os.path.join(os.path.dirname(__file__), "contacts.db"))
EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS contact_submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            ip_address TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

class PortfolioAPIHandler(http.server.BaseHTTPRequestHandler):
    def _send_json(self, status_code, data):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        path = self.path.split("?")[0]
        if path == "/api/contact/health" or path == "/health":
            self._send_json(200, {
                "status": "healthy",
                "backend": "python3:native_sqlite",
                "database": DB_PATH,
                "timestamp": datetime.utcnow().isoformat()
            })
            return

        if path == "/api/contact/submissions":
            try:
                conn = sqlite3.connect(DB_PATH)
                conn.row_factory = sqlite3.Row
                c = conn.cursor()
                c.execute("SELECT id, name, email, subject, message, created_at FROM contact_submissions ORDER BY id DESC LIMIT 20")
                rows = c.fetchall()
                conn.close()
                submissions = [
                    {
                        "id": r["id"],
                        "name": r["name"],
                        "email": r["email"],
                        "subject": r["subject"],
                        "message": r["message"],
                        "created_at": r["created_at"]
                    }
                    for r in rows
                ]
                self._send_json(200, {"total": len(submissions), "submissions": submissions})
            except Exception as e:
                self._send_json(500, {"error": str(e)})
            return

        self._send_json(404, {"error": "Not found"})

    def do_POST(self):
        path = self.path.split("?")[0]
        if path != "/api/contact":
            self._send_json(404, {"error": "Not found"})
            return

        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length <= 0:
                self._send_json(400, {"success": False, "message": "Empty request body"})
                return

            raw_body = self.rfile.read(content_length).decode("utf-8")
            data = json.loads(raw_body)
        except Exception as e:
            self._send_json(400, {"success": False, "message": f"Malformed JSON: {str(e)}"})
            return

        name = str(data.get("name", "")).strip()
        email = str(data.get("email", "")).strip().lower()
        subject = str(data.get("subject", "")).strip()
        message = str(data.get("message", "")).strip()
        honeypot = str(data.get("honeypot", "")).strip()

        if honeypot:
            self._send_json(400, {"success": False, "message": "Spam detected: automated submission rejected."})
            return

        if len(name) < 2:
            self._send_json(400, {"success": False, "message": "Please enter a valid name (at least 2 characters)."})
            return

        if not EMAIL_REGEX.match(email):
            self._send_json(400, {"success": False, "message": "Please enter a valid email address."})
            return

        if len(subject) < 3:
            self._send_json(400, {"success": False, "message": "Please enter a subject (at least 3 characters)."})
            return

        if len(message) < 10:
            self._send_json(400, {"success": False, "message": "Please write a message with at least 10 characters."})
            return

        client_ip = self.client_address[0] if self.client_address else "unknown"

        try:
            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute(
                """
                INSERT INTO contact_submissions (name, email, subject, message, ip_address, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (name, email, subject, message, client_ip, datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
            )
            conn.commit()
            sub_id = c.lastrowid
            conn.close()

            self._send_json(201, {
                "success": True,
                "message": "Message sent and stored successfully via Python SQLite service.",
                "submission_id": sub_id,
                "timestamp": datetime.utcnow().isoformat()
            })
        except Exception as e:
            self._send_json(500, {"success": False, "message": f"Database storage error: {str(e)}"})

    def log_message(self, format, *args):
        sys.stderr.write(f"[Python API] {self.address_string()} - {format % args}\n")

def run():
    init_db()
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer((HOST, PORT), PortfolioAPIHandler) as httpd:
        print(f"[Python Backend] Running on http://{HOST}:{PORT}")
        print(f"[Python Backend] Database connected at: {DB_PATH}")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            httpd.shutdown()

if __name__ == "__main__":
    run()
