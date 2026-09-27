# Bulk Mail Sender

This is a flat GitHub Pages project. All files are in the repository root.

## Files

- `index.html`
- `style.css`
- `app.js`
- `firestore.rules`

## Firebase setup

1. Create a Firebase project.
2. Enable Authentication -> Email/Password.
3. Create a Firestore database.
4. Add a Web App and copy its Firebase config into `app.js`.
5. Publish the contents of `firestore.rules` as Firestore Rules.
6. Add your GitHub Pages domain to Firebase Authentication -> Settings -> Authorized domains.

## EmailJS setup

Create an EmailJS service and email template.

Template variables expected by this app:

- `{{to_email}}`
- `{{to_name}}`
- `{{subject}}`
- `{{message}}`
- `{{from_name}}`

Put the Service ID, Template ID and Public Key into the dashboard.

## CSV format

```csv
name,email,company
Rahul,rahul@example.com,ABC Ltd
Amit,amit@example.com,XYZ Ltd
Priya,priya@example.com,DEF Ltd
```

You can use any additional columns and reference them in the body with `{{column_name}}`.

## Important

The browser sends through EmailJS. GitHub Pages cannot safely run a private SMTP credential. EmailJS/provider quotas and anti-abuse policies still apply even though this UI does not impose a recipient-count limit.
