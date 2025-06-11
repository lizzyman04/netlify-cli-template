document.addEventListener('DOMContentLoaded', () => {
    function switchTab(tabId) {
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
        document.getElementById(tabId).classList.remove('hidden');
        document.querySelectorAll('.tab-button').forEach(button => {
            if (button.getAttribute('data-tab') === tabId) {
                button.classList.remove('bg-gray-300', 'text-gray-800');
                button.classList.add('bg-blue-600', 'text-white', 'active');
            } else {
                button.classList.remove('bg-blue-600', 'text-white', 'active');
                button.classList.add('bg-gray-300', 'text-gray-800');
            }
        });
    }

    async function callHello() {
        const name = document.getElementById('nameInput').value || 'Guest';
        const responseElement = document.getElementById('helloResponse');
        try {
            const res = await fetch(`/api/hello?name=${encodeURIComponent(name)}`);
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            const data = await res.json();
            responseElement.textContent = data.message || data.error || 'No message returned';
        } catch (error) {
            responseElement.textContent = `Error calling hello function: ${error.message}`;
        }
    }

    async function callTime() {
        const responseElement = document.getElementById('timeResponse');
        try {
            const res = await fetch('/api/time');
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            const data = await res.json();
            responseElement.textContent = data.message ? `${data.message}: ${data.time.formatted}` : 'No time returned';
        } catch (error) {
            responseElement.textContent = `Error calling time function: ${error.message}`;
        }
    }

    async function callEcho() {
        const input = document.getElementById('echoInput').value;
        const responseElement = document.getElementById('echoResponse');
        try {
            let body;
            try {
                body = input ? JSON.parse(input) : {};
            } catch (e) {
                responseElement.textContent = `Invalid JSON: ${e.message}`;
                return;
            }
            const res = await fetch('/api/echo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`HTTP error: ${res.status}, ${JSON.stringify(errorData)}`);
            }
            const data = await res.json();
            responseElement.textContent = data.message
                ? `${data.message}: ${JSON.stringify(data.received, null, 2)}`
                : `Response: ${JSON.stringify(data, null, 2)}`;
        } catch (error) {
            responseElement.textContent = `Error calling echo function: ${error.message}`;
        }
    }

    async function callNeon() {
        const responseElement = document.getElementById('neonResponse');
        try {
            const res = await fetch('/api/neon');
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            const data = await res.json();
            responseElement.textContent = data.message || data.error || 'No message returned';
        } catch (error) {
            responseElement.textContent = `Error calling neon function: ${error.message}`;
        }
    }

    switchTab('hello');

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    document.querySelector('[data-action="callHello"]').addEventListener('click', callHello);
    document.querySelector('[data-action="callTime"]').addEventListener('click', callTime);
    document.querySelector('[data-action="callEcho"]').addEventListener('click', callEcho);
    document.querySelector('[data-action="callNeon"]').addEventListener('click', callNeon);
});