function test() {
    HTTPSTATUS('mock.httpstatus.io/redirect?count=3','googlebot-smartphone')
  }
  
  const isValidUrl = urlString => {
      var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
      }
  
  /**
   * Check status code, redirect location and redirect chain of a request URL. For more details see: https://httpstatus.io/api/documentation
   * @param {'http://wikipedia.com'} url The URL of the page you want to check.
   * @param {'googlebot-smartphone'} ua [OPTIONAL] Set the 'user-agent' header to test the response under different strings. The default user-agent contains the following string: "httpstatus/3.0 (+https://httpstatus.io)"
   * @param {'username'} username [OPTIONAL] A username for HTTP Basic authentication. 
   * @param {'password'} password [OPTIONAL] A password for HTTP Basic authentication. 
   * @return Number of redirects, status codes and redirect locations 
   * @customFunction
  */
  
  function HTTPSTATUS(url,ua,username,password){
    // Get API key
    const range = SpreadsheetApp.getActive().getSheetByName('Settings').getRange('B1');
    const apiKey = range.getValue();
  
    // Set fetch options
    const data = {
      "requestUrl": url,
      "userAgent": ua,
      "username": username,
      "password": password
    };
    
    // Convert the JavaScript object to a JSON string.
    const payload = JSON.stringify(data);
    
    // Request options
    const options = {
      "method" : "POST",
      headers: {
        "x-billing-token": apiKey
      },
      "contentType" : "application/json",
      "payload" : payload
    };
    //Logger.log(options)
  
    try {
      // Check for API key
      if(!apiKey) {throw new Error('Please add a valid API key in the settings tab.')}; 
      // Check for valid request URL
      if(!isValidUrl(url)) {throw new Error('Please add a valid URL.')};
      
      // Fetch data from HttpStatus API
      const fetchUrl = "https://api.httpstatus.io/v1/status";
      const apiResponse = UrlFetchApp.fetch(fetchUrl, options);
      //Logger.log(apiResponse);
  
      // Parse response
      const jsonResponse = JSON.parse(apiResponse.getContentText());
  
      // Set output array
      let output = []
      output.push(jsonResponse.response.numberOfRedirects)
      jsonResponse.response.chain.forEach((item, index) => {
        if(item.statusCode !== 0) {
          if (index === 0) {
          output.push('');
          output.push('');
          }
          output.push(item.statusCode),
          output.push(item.redirectTo)
      } else {
          output.push(item.errorType)
          output.push(item.errorMessage)
        }
      });
  
      return output
    }
    catch(error) {
      return error.message
    }
  }