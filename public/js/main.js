document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input').value;
    if (!input) return;

    // 1. Add user message to UI
    appendMessage('user', input);

    try {
        // 2. Call your backend (AI + Mercado Pago Preference)
        const response = await fetch('/api/process-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input })
        });

        const data = await response.json();

        // 3. Display AI response and Payment Button
        appendMessage('bot', data.message);
        
        if (data.checkoutUrl) {
            appendPaymentButton(data.checkoutUrl);
        }
    } catch (error) {
        appendMessage('bot', "I'm sorry, I couldn't process your order. Please try again.");
    }
});

function appendPaymentButton(url) {
    const btn = document.createElement('a');
    btn.href = url;
    btn.className = 'mp-button';
    btn.innerText = 'Pay with Mercado Pago';
    document.getElementById('chat-window').appendChild(btn);
}
