var http, director, cool, bot, router, server, port, okc, router1;

http        = require('http');
director    = require('director');
bot         = require('./botty.js');
okc = require('./okc.js');


router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

//my stuff//

//stop fucking up//

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
}
