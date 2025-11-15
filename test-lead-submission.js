// Test script to submit a demo lead to Google Sheets
// This simulates what happens when someone fills out your lead form

const testLeadData = {
  timestamp: new Date().toISOString(),
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
  source: 'homepage',
  ctaType: 'demo',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  parentName: 'John Smith',
  studentName: 'Emma Smith',
  childAge: '12-14',
  message: 'I am interested in the SpeakCEO program for my daughter Emma. She loves public speaking and has shown interest in starting her own business. Would love to learn more about the 180-day program.',
  interests: 'Public Speaking, Business, Entrepreneurship',
  grade: '8th Grade',
  experience: 'Beginner',
  goals: 'Build confidence, Learn business skills, Develop leadership',
  budget: '$500-1000',
  timeline: 'Next 3 months',
  referralSource: 'Google Search',
  priority: 'High',
  status: 'New'
};

// Your Google Apps Script Web App URL (you'll need to replace this with your actual URL)
const WEB_APP_URL = 'https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec';

async function submitTestLead() {
  try {
    console.log('🎯 Submitting test lead to Google Sheets...');
    console.log('Lead data:', testLeadData);
    
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testLeadData)
    });

    console.log('✅ Test lead submitted successfully!');
    console.log('Check your Google Sheet for the new entry.');
    console.log('Sheet URL: https://docs.google.com/spreadsheets/d/10O-1oe309UkelsUautOLoZFP0Q42AT9obaVvjbHBTQU/edit');
    
  } catch (error) {
    console.error('❌ Error submitting test lead:', error);
    console.log('This is expected if you haven\'t set up the Google Apps Script yet.');
    console.log('Follow the setup guide in GOOGLE_SHEETS_SETUP.md');
  }
}

// For Node.js environment
if (typeof window === 'undefined') {
  // Install node-fetch if running in Node.js: npm install node-fetch
  const fetch = require('node-fetch');
  submitTestLead();
} else {
  // For browser environment
  submitTestLead();
}

console.log(`
🎯 TEST LEAD SUBMISSION
======================

This script simulates a lead form submission to your Google Sheet.

Expected Result:
- A new row should appear in your Google Sheet
- The row should contain all the test data above
- Priority should be colored (High = Red background)
- Status should be colored (New = Blue background)

If this doesn't work:
1. Make sure you've deployed the Google Apps Script (see GOOGLE_SHEETS_SETUP.md)
2. Update the WEB_APP_URL in this script with your actual URL
3. Check that your Google Sheet is accessible and editable

Sheet URL: https://docs.google.com/spreadsheets/d/10O-1oe309UkelsUautOLoZFP0Q42AT9obaVvjbHBTQU/edit
`);
