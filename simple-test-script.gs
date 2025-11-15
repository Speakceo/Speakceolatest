/**
 * SIMPLE TEST SCRIPT - Copy this to Google Apps Script
 * This will add a test row directly to your sheet
 */

function simpleTest() {
  // Your sheet ID
  const SHEET_ID = '10O-1oe309UkelsUautOLoZFP0Q42AT9obaVvjbHBTQU';
  
  try {
    // Open your sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Sheet1');
    
    // Add a simple test row
    const testData = [
      new Date().toLocaleString(), // Timestamp
      'Test Entry',                // Source
      'John Doe',                  // Name  
      'john@example.com',          // Email
      '+1234567890',              // Phone
      'Test message from Google Apps Script'
    ];
    
    // Find the next empty row
    const nextRow = sheet.getLastRow() + 1;
    
    // Add the data
    sheet.getRange(nextRow, 1, 1, testData.length).setValues([testData]);
    
    console.log('✅ Test data added successfully to row ' + nextRow);
    return 'Success! Check your Google Sheet.';
    
  } catch (error) {
    console.error('❌ Error:', error);
    return 'Error: ' + error.message;
  }
}
