const express = require('express');
const axios = require('axios');
const convertUrl = require('./converter');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');


app.use(cors());

app.get('/', (req, res) => {
    res.send('Music Redirect Backend');
});

// A route to handle URL conversion
app.get('/convert', async (req, res) => {
    const { url, targetService } = req.query;
    if (!url || !targetService) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        const convertedUrl = await convertUrl(url, targetService);
        res.json({ originalUrl: url, convertedUrl });
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send the error message to the frontend
    }
});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});