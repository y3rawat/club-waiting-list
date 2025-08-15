# Google Sheets Integration Setup

## Step-by-Step Instructions

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Elite Club Waitlist"

### 2. Set up Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete the default `myFunction()` code
3. Copy the entire code from `scripts/google-apps-script.js`
4. Paste it into the Apps Script editor
5. Save the project (Ctrl+S)

### 3. Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Choose type: **Web app**
3. Description: "Elite Club Waitlist API"
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Click **Deploy**
7. **Copy the Web App URL** (you'll need this)

### 4. Update Next.js API Route
1. Open `app/api/waitlist/route.ts`
2. Replace `YOUR_SCRIPT_ID` with your actual Web App URL
3. Example: `https://script.google.com/macros/s/AKfycbx.../exec`

### 5. Configure Admin Email
1. In the Google Apps Script, find `sendAdminNotification` function
2. Replace `admin@yourclub.com` with your actual admin email

### 6. Test the Integration
1. Submit a test application through your waitlist form
2. Check your Google Sheet for the new row
3. Check your email for the admin notification
4. The applicant should receive a confirmation email

## Email Templates Included
- **Confirmation Email**: Luxury-branded email sent to applicants
- **Admin Notification**: Detailed application summary for review

## Troubleshooting
- If emails aren't sending, check Gmail's spam folder
- Ensure the Google Apps Script has permission to send emails
- Verify the Web App URL is correctly set in the Next.js API route
