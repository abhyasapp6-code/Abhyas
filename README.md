# Abhyas — Government Exam Preparation Platform

Starter project for SSC, CGL, SSC GD, Railway Group D, Railway NTPC and similar exams.

## Folder structure

- `user-app/` — student-facing exam/practice interface
- `admin/` — admin management dashboard
- `question-upload/` — bulk question upload interface
- `data/` — exam and question data
- `bulk-upload/pdfs/` — place question PDFs here for bulk processing
- `bulk-upload/template/` — required PDF format and sample
- `uploads/pdfs/` — uploaded PDFs
- `uploads/processed/` — processed/imported files

## Bulk PDF question format

Use the template in `bulk-upload/template/PDF_QUESTION_FORMAT.txt`.

Example:

Q1. What is the capital of India?
A) Mumbai
B) New Delhi
C) Kolkata
D) Chennai
Answer: B
Explanation: New Delhi is the capital of India.
Marks: 1

Each question should have four options, one Answer line, and optional Explanation/Marks lines.

## Important

This is a frontend starter/scaffold. Real production authentication, database storage, PDF parsing/OCR, payment processing and secure admin authorization should be connected to a backend before production use.
