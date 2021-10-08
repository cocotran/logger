const http = require("http");

const Logger = require("../logger/logger.js");

const host = "localhost";
const port = 8000;
const logger = new Logger("app.js");

const requestListener = function (req, res) {
  logger.debug("Will send reponse");
  res.writeHead(200);
  res.end("Hello World!");
  logger.info("Sent reponse");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
