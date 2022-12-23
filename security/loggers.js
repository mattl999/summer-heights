const fs = require("fs");


let writeLog = (errorLog) => {
    fs.appendFile("./security/logs.txt", errorLog, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Log added to file");
      }
    });
  };
  let composeErrorMessage = (errType, curTime, data) => {
    return `\n|| ${errType} || ${curTime}
      ${data.method} '${data.url}'    
      Body: '${data.body.user}', '${data.body.pass}'
      Referer: ${data.referer}
      Content-Type: ${data.contType}
      IP address: ${data.address} 
  
      User-agent: ${data.userAgent}
            `;
  };

  module.exports = {
    writeLog,
    composeErrorMessage
  }