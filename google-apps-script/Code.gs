/**
 * Google Apps Script for SpeakCEO Lead Capture
 * Deploy this as a Web App to receive lead data from your website
 */

// Your Google Sheet ID
const SHEET_ID = '10O-1oe309UkelsUautOLoZFP0Q42AT9obaVvjbHBTQU';
const SHEET_NAME = 'Sheet1';

/**
 * Handle POST requests from your website
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add the lead to the sheet
    const result = addLeadToSheet(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Lead added successfully',
        rowNumber: result.rowNumber
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing lead:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'SpeakCEO Lead Capture API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Add lead data to the Google Sheet
 */
function addLeadToSheet(leadData) {
  try {
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      createHeaders(sheet);
    }
    
    // Prepare the row data
    const rowData = [
      leadData.timestamp || new Date().toLocaleString(),
      leadData.date || new Date().toLocaleDateString(),
      leadData.time || new Date().toLocaleTimeString(),
      leadData.source || '',
      leadData.ctaType || '',
      leadData.name || '',
      leadData.email || '',
      leadData.phone || '',
      leadData.parentName || '',
      leadData.studentName || '',
      leadData.childAge || '',
      leadData.message || '',
      leadData.interests || '',
      leadData.grade || '',
      leadData.experience || '',
      leadData.goals || '',
      leadData.budget || '',
      leadData.timeline || '',
      leadData.referralSource || '',
      leadData.priority || 'Medium',
      leadData.status || 'New',
      '', // Notes column
      '', // Follow-up date column
      new Date().toISOString() // Created at
    ];
    
    // Add the row to the sheet
    const rowNumber = sheet.getLastRow() + 1;
    sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
    
    // Format the new row
    formatNewRow(sheet, rowNumber);
    
    console.log(`Lead added to row ${rowNumber}:`, leadData.email || leadData.name);
    
    return {
      success: true,
      rowNumber: rowNumber,
      leadId: `lead_${rowNumber}_${Date.now()}`
    };
    
  } catch (error) {
    console.error('Error adding lead to sheet:', error);
    throw error;
  }
}

/**
 * Create headers for the sheet
 */
function createHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Date',
    'Time',
    'Source',
    'CTA Type',
    'Name',
    'Email',
    'Phone',
    'Parent Name',
    'Student Name',
    'Child Age',
    'Message',
    'Interests',
    'Grade',
    'Experience',
    'Goals',
    'Budget',
    'Timeline',
    'Referral Source',
    'Priority',
    'Status',
    'Notes',
    'Follow-up Date',
    'Created At'
  ];
  
  // Add headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  
  // Freeze the header row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * Format a new row
 */
function formatNewRow(sheet, rowNumber) {
  const range = sheet.getRange(rowNumber, 1, 1, 24);
  
  // Alternate row colors
  if (rowNumber % 2 === 0) {
    range.setBackground('#f8f9fa');
  }
  
  // Set font
  range.setFontSize(10);
  
  // Format priority column (column T = 20)
  const priorityCell = sheet.getRange(rowNumber, 20);
  const priority = priorityCell.getValue();
  
  switch (priority) {
    case 'High':
      priorityCell.setBackground('#fee2e2');
      priorityCell.setFontColor('#dc2626');
      break;
    case 'Medium':
      priorityCell.setBackground('#fef3c7');
      priorityCell.setFontColor('#d97706');
      break;
    case 'Low':
      priorityCell.setBackground('#dcfce7');
      priorityCell.setFontColor('#16a34a');
      break;
  }
  
  // Format status column (column U = 21)
  const statusCell = sheet.getRange(rowNumber, 21);
  const status = statusCell.getValue();
  
  switch (status) {
    case 'New':
      statusCell.setBackground('#dbeafe');
      statusCell.setFontColor('#2563eb');
      break;
    case 'Contacted':
      statusCell.setBackground('#fef3c7');
      statusCell.setFontColor('#d97706');
      break;
    case 'Qualified':
      statusCell.setBackground('#e0e7ff');
      statusCell.setFontColor('#7c3aed');
      break;
    case 'Converted':
      statusCell.setBackground('#dcfce7');
      statusCell.setFontColor('#16a34a');
      break;
    case 'Lost':
      statusCell.setBackground('#fee2e2');
      statusCell.setFontColor('#dc2626');
      break;
  }
}

/**
 * Test function to add a sample lead
 */
function testAddLead() {
  const sampleLead = {
    timestamp: new Date().toLocaleString(),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    source: 'homepage',
    ctaType: 'demo',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    parentName: 'Jane Doe',
    studentName: 'Johnny Doe',
    childAge: '12-14',
    message: 'Interested in the program for my child',
    interests: 'Business, Public Speaking',
    priority: 'High',
    status: 'New'
  };
  
  const result = addLeadToSheet(sampleLead);
  console.log('Test lead added:', result);
}

/**
 * Get lead statistics
 */
function getLeadStats() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return {
        total: 0,
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        lost: 0
      };
    }
    
    // Get all status values (column U = 21)
    const statusRange = sheet.getRange(2, 21, lastRow - 1, 1);
    const statuses = statusRange.getValues().flat();
    
    const stats = {
      total: lastRow - 1,
      new: statuses.filter(s => s === 'New').length,
      contacted: statuses.filter(s => s === 'Contacted').length,
      qualified: statuses.filter(s => s === 'Qualified').length,
      converted: statuses.filter(s => s === 'Converted').length,
      lost: statuses.filter(s => s === 'Lost').length
    };
    
    return stats;
  } catch (error) {
    console.error('Error getting lead stats:', error);
    return null;
  }
}
