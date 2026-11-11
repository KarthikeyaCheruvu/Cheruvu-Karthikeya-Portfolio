# Python FastAPI + SQLite Backend
### Cheruvu Karthikeya — Developer Portfolio

This backend fulfills the college mandatory requirement for a functional Python backend service handling contact inquiries with SQLite persistence, rigorous schema validation, and spam honeypot filtering.

---

## Architecture Overview

- **Framework**: FastAPI (or native Python 3.10 HTTP Server in sandbox)
- **Database**: SQLite3 (`contacts.db`)
- **Validation**: Pydantic / RFC Email Regex & Length Constraints
- **Spam Defense**: Honeypot field inspection
- **CORS**: Configurable cross-origin resource sharing

---

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/contact` | Submits message, validates email & honeypot, stores to SQLite |
| `GET` | `/api/contact/health` | Returns backend status and SQLite connection status |
| `GET` | `/api/contact/submissions` | Retrieves recent submissions (for verification & evaluation) |

---

## Local Development & College Evaluation

### Running with FastAPI + Uvicorn:
```bash
# 1. Install dependencies
pip install -r backend/requirements.txt

# 2. Run the server
uvicorn backend.main:app --reload --port 8000
```

### Running with Native Python (Zero External Dependencies):
```bash
python3 backend/server.py
```

---

## Deployment to Render / Free Cloud Hosting

1. **New Web Service** on Render
2. **Build Command**: `pip install -r backend/requirements.txt`
3. **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
4. Set Environment Variables:
   - `CORS_ORIGINS`: Your Vercel / Netlify frontend domain (or `*`)
   - `SQLITE_DB_PATH`: `/opt/render/project/src/backend/contacts.db` (or persistent disk path)
