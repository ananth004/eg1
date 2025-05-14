// This code goes in your Google Apps Script project
function doGet(e) {
  if (e.parameter.action === 'getLeaderboard') {
    return getLeaderboard();
  }
  return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.action === 'saveResult') {
    return saveResult(data.data);
  }
  return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getLeaderboard() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const results = data.slice(1).map(row => {
    const result = {};
    headers.forEach((header, index) => {
      result[header] = row[index];
    });
    return result;
  });
  
  return ContentService.createTextOutput(JSON.stringify(results))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveResult(result) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    result.name,
    result.department,
    result.year,
    result.score,
    result.totalQuestions,
    result.timestamp
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}