# Bulk Upload Workflow

1. Prepare a PDF using `abhyas_bulk_format.md`.
2. Upload the PDF in the Question Upload portal.
3. Extract and validate question blocks.
4. Show a human-review preview with validation errors.
5. Import approved questions into the question bank.
6. Publish the selected exam/version.

For production, PDF parsing should happen on a secure backend. The frontend should never contain database credentials or admin secrets.
