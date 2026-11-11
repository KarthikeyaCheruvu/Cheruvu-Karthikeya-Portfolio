"""
FastAPI Backend Application
Cheruvu Karthikeya - Developer Portfolio
Provides API for Contact Form submissions with SQLite storage & validation.
"""
import os
import sqlite3
from datetime import datetime
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from .database import get_db_connection, init_db
from .schemas import ContactSubmissionCreate, ContactSubmissionResponse

init_db()

app = FastAPI(
    title="Cheruvu Karthikeya Portfolio API",
    description="Backend service providing contact form handling with SQLite persistence and spam validation",
    version="1.0.0"
)

ALLOWED_ORIGINS = os.environ.get("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Cheruvu Karthikeya Portfolio API",
        "version": "1.0.0",
        "endpoints": {
            "POST /api/contact": "Submit a contact message",
            "GET /api/contact/health": "Health check status",
            "GET /api/contact/submissions": "List recent submissions (evaluation/demo)"
        }
    }

@app.get("/api/contact/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "sqlite3:active"
    }

@app.post("/api/contact", response_model=ContactSubmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_contact_form(payload: ContactSubmissionCreate, request: Request):
    if payload.honeypot:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Spam validation failed: automated bot submission detected."
        )

    client_ip = request.client.host if request.client else "unknown"

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO contact_submissions (name, email, subject, message, ip_address, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                payload.name.strip(),
                payload.email.strip().lower(),
                payload.subject.strip(),
                payload.message.strip(),
                client_ip,
                datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
            )
        )
        conn.commit()
        submission_id = cursor.lastrowid
        conn.close()

        return ContactSubmissionResponse(
            success=True,
            message="Your message has been received and stored successfully.",
            submission_id=submission_id,
            timestamp=datetime.utcnow().isoformat()
        )
    except sqlite3.Error as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error while saving submission: {str(e)}"
        )

@app.get("/api/contact/submissions")
def get_submissions():
    """Retrieve recent submissions for verification/college evaluation."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, name, email, subject, message, created_at FROM contact_submissions ORDER BY id DESC LIMIT 20"
        )
        rows = cursor.fetchall()
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
        return {"total": len(submissions), "submissions": submissions}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
