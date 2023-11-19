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
    const discordWebhookURL = 'https://discord.com/api/webhooks/1175602643566080170/hv_DJ4i6dVZnJaj9pMO13K6GZfiKId0Qn2E0nD1lGxV8V_TkkHivb4iqFeEgwJc5uxOh';
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
    alert('Privacy Policy:\nThis page logs IPs, they are deleted every 2 minutes.\nA Discord bot detects if there is a request spam wave (20+ requests from the same IP within the allocated 2 minutes) and lets me know.');
    console.log('Catching a bad guy, this is why this is here.');
}
