var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respondOklahoma() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /oklahoma$/i;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postOklahoma();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postOklahoma() {
  var botResponse , options, body, botReq;

  botResponse = "Shut the fuck up about Oklahoma. Forever";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respondOklahoma = respondOklahoma;
