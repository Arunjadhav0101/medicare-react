const axios = require('axios');

async function testFetch() {
    try {
        const response = await axios.get('http://localhost:5000/api/bloodbank/requests/user/13');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.log('Response data:', error.response.data);
        }
    }
}

testFetch();
