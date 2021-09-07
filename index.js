const http = require("http");

http.createServer().listen(3000, () => {
    console.log('Server listening on port 3000');
}).on("request", require("./httpHandler"));


