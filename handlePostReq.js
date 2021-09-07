const url = require("url");
module.exports = (content, req, res) => {
    const size = parseInt(req.headers['content-length'], 10);
    switch (url.parse(req.url).pathname) {
        case "/products":
        {
            let data = [];
            let offset = 0;
            req.on("data", (chunk) => {
                offset += chunk.length;
                if (chunk.length > size) {
                    res.statusCode = 413;
                    res.end();
                } else {
                    data.push(chunk);
                }
            });
            req.on("end", () => {
                const data_json = JSON.parse(Buffer.concat(data).toString());
                if (
                    typeof data_json.displayName === "undefined" ||
                    typeof data_json.price === "undefined"
                ) {
                    res.statusCode = 400;
                    res.end();
                }
                else {
                    res.setHeader('Content-Type', 'application/json')
                    content.push(data_json);
                    res.end(JSON.stringify(data_json));
                }
            });
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