# Abhyas Architecture

## 1. User App
Registration/login, forgot password, profile, exam catalogue, practice/test runner, timer, question navigation, results and history, subscription/package status.

## 2. Admin Portal
Dashboard, users, premium access, packages, exams, question bank, uploads, results and reports.

## 3. Question Upload
Bulk PDF/structured import, validation, preview, correction and publish workflow.

## Data-first rule
Questions and exams belong in data/database rather than hard-coded UI. After the backend is connected, adding or updating questions should not require source-code changes.

## Security
Production admin actions must be protected by server-side authorization. Never put admin secrets in frontend code.
