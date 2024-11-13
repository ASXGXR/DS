// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve the frontend HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/fetch-images', async (req, res) => {
    const pageUrl = req.query.url;

    if (!pageUrl) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    try {
        const response = await axios.get(pageUrl);
        const html = response.data;
        const imageUrls = extractImageUrls(html);

        res.json({ imageUrls });
    } catch (error) {
        console.error('Error fetching the page:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

function extractImageUrls(html) {
    const urlPattern = /https:\/\/ae01\.alicdn\.com\/kf\/[a-zA-Z0-9]+\/[^"]+\.jpg/g;
    const urls = new Set(html.match(urlPattern));
    return Array.from(urls).filter(url => !url.endsWith('80x80.jpg'));
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
