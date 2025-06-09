async function callHello() {
    const name = document.getElementById('nameInput').value || 'Guest';
    const responseElement = document.getElementById('helloResponse');
    try {
        const res = await fetch(`/api/hello?name=${encodeURIComponent(name)}`);
        const data = await res.json();
        responseElement.textContent = data.message || data.error;
    } catch (error) {
        responseElement.textContent = 'Error calling hello function';
        console.error(error);
    }
}

async function callTime() {
    const responseElement = document.getElementById('timeResponse');
    try {
        const res = await fetch('/api/time');
        const data = await res.json();
        responseElement.textContent = data.message + ': ' + data.time.formatted;
    } catch (error) {
        responseElement.textContent = 'Error calling time function';
        console.error(error);
    }
}

async function callEcho() {
    const input = document.getElementById('echoInput').value;
    const responseElement = document.getElementById('echoResponse');
    try {
        let body;
        try {
            body = JSON.parse(input || '{}');
        } catch (e) {
            responseElement.textContent = 'Invalid JSON';
            return;
        }
        const res = await fetch('/api/echo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        responseElement.textContent = data.message + ': ' + JSON.stringify(data.received);
    } catch (error) {
        responseElement.textContent = 'Error calling echo function';
        console.error(error);
    }
}