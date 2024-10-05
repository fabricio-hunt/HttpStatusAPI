function testMultipleUrls() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();  // Descobre a última linha com dados
    var urls = sheet.getRange(2, 1, lastRow - 1, 1).getValues();  // Obtém todas as URLs a partir da linha 2
  
    for (var i = 0; i < urls.length; i++) {
      if (urls[i][0]) {  // Verifica se a URL não está vazia
        var result = HTTPSTATUS(urls[i][0], 'googlebot-smartphone');
        var row = i + 2;  // Ajusta a linha
  
        // Garante que cada parte do array seja verificada adequadamente
        var redirects = (typeof result[0] === 'number') ? result[0] : 'N/A';
        var errorType = (typeof result[1] === 'string') ? result[1] : 'N/A';
        var errorMessage = (typeof result[2] === 'string') ? result[2] : 'N/A';
        var statusCode1 = (typeof result[3] === 'number') ? result[3] : 'N/A';
        var url1 = (typeof result[4] === 'string') ? result[4] : 'N/A';
        var statusCode2 = (typeof result[5] === 'number') ? result[5] : 'N/A';
        var url2 = (typeof result[6] === 'string') ? result[6] : 'N/A';
        var statusCode3 = (typeof result[7] === 'number') ? result[7] : 'N/A';
        var url3 = (typeof result[8] === 'string') ? result[8] : 'N/A';
  
        // Preenche os dados nas células
        sheet.getRange(row, 2).setValue(redirects);  // Número de redirecionamentos
        sheet.getRange(row, 3).setValue(errorType);  // Tipo de erro (se existir)
        sheet.getRange(row, 4).setValue(errorMessage);  // Mensagem de erro (se existir)
        sheet.getRange(row, 5).setValue(statusCode1);  // Código de status do 1º redirecionamento
        sheet.getRange(row, 6).setValue(url1);  // URL do 1º redirecionamento
        sheet.getRange(row, 7).setValue(statusCode2);  // Código de status do 2º redirecionamento
        sheet.getRange(row, 8).setValue(url2);  // URL do 2º redirecionamento
        sheet.getRange(row, 9).setValue(statusCode3);  // Código de status do 3º redirecionamento
        sheet.getRange(row, 10).setValue(url3);  // URL do 3º redirecionamento
      }
    }
  }
  