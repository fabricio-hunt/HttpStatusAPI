## Function to Check Multiple URLs

### `testMultipleUrls()`
This function retrieves multiple URLs from a Google Sheet, checks their redirect chains using the `HTTPSTATUS()` function, and writes the results back into the sheet. It handles multiple rows of URLs, processing each URL individually.

#### Functionality:
- The function fetches a list of URLs from the first column of the Google Sheet, starting from row 2.
- For each URL, it runs the `HTTPSTATUS()` function and writes the result (including redirects, errors, and status codes) back into specific columns.

#### Workflow:
1. **Retrieve URLs**: The function gets the URLs from the sheet.
2. **Validate URL**: If the URL is not empty, it checks the redirect chain.
3. **Output**: It writes back the following information to the sheet:
   - Number of redirects
   - Error type and message, if any
   - Status codes and redirect URLs for up to 3 redirects

### Example:

```javascript
function testMultipleUrls() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();  // Get the last row with data
  var urls = sheet.getRange(2, 1, lastRow - 1, 1).getValues();  // Fetch all URLs starting from row 2

  for (var i = 0; i < urls.length; i++) {
    if (urls[i][0]) {  // Check if the URL is not empty
      var result = HTTPSTATUS(urls[i][0], 'googlebot-smartphone');
      var row = i + 2;  // Adjust the row number for output

      // Ensure each part of the result array is handled properly
      var redirects = (typeof result[0] === 'number') ? result[0] : 'N/A';
      var errorType = (typeof result[1] === 'string') ? result[1] : 'N/A';
      var errorMessage = (typeof result[2] === 'string') ? result[2] : 'N/A';
      var statusCode1 = (typeof result[3] === 'number') ? result[3] : 'N/A';
      var url1 = (typeof result[4] === 'string') ? result[4] : 'N/A';
      var statusCode2 = (typeof result[5] === 'number') ? result[5] : 'N/A';
      var url2 = (typeof result[6] === 'string') ? result[6] : 'N/A';
      var statusCode3 = (typeof result[7] === 'number') ? result[7] : 'N/A';
      var url3 = (typeof result[8] === 'string') ? result[8] : 'N/A';

      // Write the results into the sheet
      sheet.getRange(row, 2).setValue(redirects);  // Number of redirects
      sheet.getRange(row, 3).setValue(errorType);  // Error type (if any)
      sheet.getRange(row, 4).setValue(errorMessage);  // Error message (if any)
      sheet.getRange(row, 5).setValue(statusCode1);  // Status code of 1st redirect
      sheet.getRange(row, 6).setValue(url1);  // URL of 1st redirect
      sheet.getRange(row, 7).setValue(statusCode2);  // Status code of 2nd redirect
      sheet.getRange(row, 8).setValue(url2);  // URL of 2nd redirect
      sheet.getRange(row, 9).setValue(statusCode3);  // Status code of 3rd redirect
      sheet.getRange(row, 10).setValue(url3);  // URL of 3rd redirect
    }
  }
}
