const form = document.getElementById('shortenForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const shortLink = document.getElementById('shortLink');
const copyBtn = document.getElementById('copyBtn');
const submitBtn = document.getElementById('submitBtn');

// ⚠️ CHANGE THIS TO YOUR RENDER URL AFTER DEPLOYING BACKEND
// Example: const API_BASE_URL = "https://snip-backend.onrender.com";
const API_BASE_URL = "https://ananttripathiak-snip-url-backend.hf.space";

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset UI
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    submitBtn.textContent = 'Snipping... ✂️';
    submitBtn.disabled = true;

    const originalUrl = document.getElementById('originalUrl').value;
    const customAlias = document.getElementById('customAlias').value;
    const expiresAt = document.getElementById('expiresAt').value;

    const payload = { originalUrl };
    if (customAlias) payload.customAlias = customAlias;
    if (expiresAt) payload.expiresAt = expiresAt;

    try {
        const response = await fetch(`${API_BASE_URL}/api/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            shortLink.href = data.shortUrl;
            shortLink.textContent = data.shortUrl;
            resultDiv.classList.remove('hidden');
        } else {
            showError(data.error || 'Something went wrong.');
        }
    } catch (err) {
        showError('Network error. Please try again.');
        console.error(err);
    } finally {
        submitBtn.textContent = 'Snip It! ✂️';
        submitBtn.disabled = false;
    }
});

function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.classList.remove('hidden');
}

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shortLink.href)
        .then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        })
        .catch(err => console.error('Failed to copy', err));
});
