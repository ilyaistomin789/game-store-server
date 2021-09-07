const express = require('express');
const app = express();

const games = [
    {
        "displayName": "Cyberpank 2077",
        "price": "60$",
    },
    {
        "displayName": "SpongeBob SquarePants: Battle for Bikini Bottom – Rehydrated",
        "price": "40$",
    },
    {
        "displayName": "God Of War",
        "price": "50$",
    }
]

app.get('/products', (req, res) => res.json(games));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});