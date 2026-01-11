import client from '../config/mpConfig.js';
import { Payment } from 'mercadopago';

export const handleWebhook = async (req, res) => {
    const paymentId = req.query.id || req.body.data?.id;

    try {
        if (req.query.topic === 'payment' || req.body.type === 'payment') {
            const payment = new Payment(client);
            const data = await payment.get({ id: paymentId });
            
            console.log(`Payment status: ${data.status}`);
            // Here you could update your database or notify the user via AI
        }
        res.sendStatus(200);
    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).send('Webhook failed');
    }
};
