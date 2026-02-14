const formInfo = new URLSearchParams(window.location.search);

document.getElementById('thanks').innerHTML = `
    <h2>Thank you, ${formInfo.get('name')}!</h2>
    <h3>Your recommendation has been received.</h3>

    <p><strong>Email:</strong> ${formInfo.get('email')}</p>
    <p><strong>Steam User ID:</strong> ${formInfo.get('steamid')}</p>
    <p><strong>Your Recommended Game(s):</strong> ${formInfo.get('recommendation')}</p>
`;
