const handleGetReq = require('./handleGetReq');
const handlePostReq = require('./handlePostReq');
const games = [
  {
    displayName: "Cyberpank 2077",
    price: "60$",
  },
  {
    displayName: "SpongeBob SquarePants: Battle for Bikini Bottom – Rehydrated",
    price: "40$",
  },
  {
    displayName: "God Of War",
    price: "50$",
  },
];

module.exports = (req, res) => {
  if (req.method === "GET") {
    return handleGetReq(games, req, res);
  } else if (req.method === "POST") {
    return handlePostReq(games, req, res);
  } else {
    res.statusCode = 404;
    res.end();
  }
};

