"""
Pydantic Schemas for Request Validation
"""
import re
from typing import Optional
from pydantic import BaseModel, Field, field_validator

EMAIL_REGEX = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Sender's full name")
    email: str = Field(..., min_length=5, max_length=120, description="Valid email address")
    subject: str = Field(..., min_length=3, max_length=150, description="Message subject line")
    message: str = Field(..., min_length=10, max_length=3000, description="Message body")
    honeypot: Optional[str] = Field(default="", description="Spam protection honeypot field (must be empty)")

    @field_validator("email")
    @classmethod
    def validate_email_address(cls, v: str) -> str:
        clean_email = v.strip().lower()
        if not re.match(EMAIL_REGEX, clean_email):
            raise ValueError("Invalid email format. Please provide a valid address like user@domain.com")
        return clean_email

    @field_validator("honeypot")
    @classmethod
    def check_spam_honeypot(cls, v: Optional[str]) -> Optional[str]:
        if v and len(v.strip()) > 0:
            raise ValueError("Spam detected: automated submission rejected.")
        return v

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    submission_id: Optional[int] = None
    timestamp: str
