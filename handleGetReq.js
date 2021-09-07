const url = require("url");
module.exports = (content, req, res) => {
    switch (url.parse(req.url).pathname) {
        case "/products":
        {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(content));
        }
            break;
        default:
        {
            res.statusCode = 404;
            res.end();
        }
            break;
    }
}