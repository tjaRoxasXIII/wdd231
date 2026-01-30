const formInfo = new URLSearchParams(window.location.search);

document.getElementById('results').innerHTML = `
    <h2>Thank you, ${formInfo.get('first')} ${formInfo.get('last')}!</h2>
    <h3>Your application details are as follows: </h3>
    <p>Business Name: ${formInfo.get('organization')}</p>
    <p>Membership Level: ${formInfo.get('membership')}</p>
    <p>Email Address: ${formInfo.get('email')}</p>
    <p>Phone Number: ${formInfo.get('phone')}</p>
    <p>Application Date: ${formInfo.get('timestamp')}</p>
`;