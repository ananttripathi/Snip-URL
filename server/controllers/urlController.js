const db = require('../db');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

const shortenUrl = async (req, res) => {
    const { originalUrl, customAlias, expiresAt } = req.body;
    const baseUrl = process.env.BASE_URL;

    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    let shortCode;

    if (customAlias) {
        const existing = await db.query('SELECT * FROM urls WHERE short_code = $1', [customAlias]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: 'Alias is already taken' });
        }
        shortCode = customAlias;
    } else {
        shortCode = nanoid();
        // Ensure uniqueness (simplified for MVP, in production loop to check)
    }

    try {
        const result = await db.query(
            'INSERT INTO urls (original_url, short_code, expires_at) VALUES ($1, $2, $3) RETURNING *',
            [originalUrl, shortCode, expiresAt || null]
        );

        const url = result.rows[0];
        res.json({
            shortUrl: `${baseUrl}/${url.short_code}`,
            shortCode: url.short_code,
            originalUrl: url.original_url
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const result = await db.query('SELECT * FROM urls WHERE short_code = $1', [shortCode]);

        if (result.rows.length === 0) {
            return res.status(404).sendFile('index.html', { root: './client' }); // Or a 404 page
        }

        const url = result.rows[0];

        // Check expiry
        if (url.expires_at && new Date(url.expires_at) < new Date()) {
            return res.status(410).json({ error: 'Link has expired' });
        }

        // Increment click count (async, don't wait)
        db.query('UPDATE urls SET click_count = click_count + 1 WHERE id = $1', [url.id]);

        res.redirect(url.original_url);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getStats = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const result = await db.query('SELECT * FROM urls WHERE short_code = $1', [shortCode]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'URL not found' });
        }

        const url = result.rows[0];
        res.json({
            shortCode: url.short_code,
            originalUrl: url.original_url,
            clickCount: url.click_count,
            createdAt: url.created_at,
            expiresAt: url.expires_at
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    shortenUrl,
    redirectUrl,
    getStats
};
