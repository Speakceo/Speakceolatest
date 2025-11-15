# Google Sheets Lead Capture Setup

This guide will help you set up automatic lead capture to your Google Sheet.

## Step 1: Deploy Google Apps Script

1. **Open Google Apps Script**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"

2. **Add the Code**
   - Delete the default `myFunction()` code
   - Copy and paste the entire contents of `google-apps-script/Code.gs`
   - Save the project (Ctrl+S) and name it "SpeakCEO Lead Capture"

3. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Choose type: "Web app"
   - Description: "SpeakCEO Lead Capture API"
   - Execute as: "Me"
   - Who has access: "Anyone" (important!)
   - Click "Deploy"
   - **Copy the Web App URL** - you'll need this!

4. **Authorize the Script**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to SpeakCEO Lead Capture (unsafe)"
   - Click "Allow"

## Step 2: Update Your Website Code

1. **Update the Web App URL**
   - Open `src/lib/googleSheets.ts`
   - Replace the `webAppUrl` with your actual Web App URL:
   ```typescript
   private webAppUrl = 'YOUR_ACTUAL_WEB_APP_URL_HERE';
   ```

2. **Test the Integration**
   - The system will automatically try to submit leads to Google Sheets
   - If it fails, leads are stored locally and will sync later

## Step 3: Verify Your Google Sheet

Your Google Sheet should now automatically:
- ✅ Create headers when the first lead is submitted
- ✅ Add new leads as rows
- ✅ Format priority and status columns with colors
- ✅ Include timestamps, source tracking, and all form data

## Expected Sheet Structure

| Column | Data |
|--------|------|
| A | Timestamp |
| B | Date |
| C | Time |
| D | Source (homepage, faq, etc.) |
| E | CTA Type (demo, contact, etc.) |
| F | Name |
| G | Email |
| H | Phone |
| I | Parent Name |
| J | Student Name |
| K | Child Age |
| L | Message |
| M | Interests |
| N | Grade |
| O | Experience |
| P | Goals |
| Q | Budget |
| R | Timeline |
| S | Referral Source |
| T | Priority (High/Medium/Low) |
| U | Status (New/Contacted/etc.) |
| V | Notes |
| W | Follow-up Date |
| X | Created At |

## Step 4: Add Lead Capture to Your Website

Use the `CTAWithLeadCapture` component anywhere on your site:

```tsx
import CTAWithLeadCapture from '../components/CTAWithLeadCapture';

// In your component
<CTAWithLeadCapture
  source="homepage"
  ctaType="demo"
  buttonText="Book Free Demo"
  title="Ready to Get Started?"
  subtitle="Join thousands of successful families"
  fields={['parentName', 'email', 'phone', 'childAge']}
/>
```

## Step 5: Test Everything

1. **Test the Form**
   - Fill out a lead capture form on your website
   - Check your Google Sheet for the new entry
   - Verify all data is captured correctly

2. **Check the Console**
   - Open browser developer tools
   - Look for success messages: "✅ Lead submitted to Google Sheets successfully"
   - If you see "⚠️ Lead stored locally", check your Web App URL

## Troubleshooting

### Common Issues:

1. **"Web App URL not working"**
   - Make sure you deployed as "Anyone" can access
   - Double-check the URL is correct
   - Try redeploying the Web App

2. **"No data appearing in sheet"**
   - Check the Google Apps Script logs (View → Logs)
   - Verify your Sheet ID is correct
   - Make sure the sheet is named "Sheet1" or update the script

3. **"CORS errors"**
   - This is normal for Google Apps Script
   - The system uses `mode: 'no-cors'` to handle this
   - Leads should still be submitted successfully

### Testing the Google Apps Script:

1. Open your Google Apps Script project
2. Run the `testAddLead()` function
3. Check your Google Sheet for a test entry
4. If it works, your setup is correct!

## Security Notes

- The Web App URL is public but only accepts POST requests with lead data
- No sensitive information is exposed
- All data goes directly to your private Google Sheet
- You can revoke access anytime by disabling the Web App

## Next Steps

Once set up, you can:
- View all leads in your Google Sheet in real-time
- Sort and filter leads by priority, status, source
- Add notes and follow-up dates directly in the sheet
- Export data for other tools
- Set up Google Sheets notifications for new leads

Your lead capture system is now fully automated! 🎉
