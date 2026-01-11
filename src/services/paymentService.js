import { Preference } from 'mercadopago';
import client from '../config/mpConfig.js';

export const createOrderPreference = async (items) => {
    const preference = new Preference(client);

    const body = {
        items: items.map(item => ({
            id: item.id || 'ai-product',
            title: item.title,
            quantity: Number(item.quantity),
            unit_price: Number(item.unit_price),
            currency_id: 'ARS' // Or your local currency (MXN, BRL, etc.)
        })),
        back_urls: {
            success: 'https://your-site.com/success',
            failure: 'https://your-site.com/failure',
            pending: 'https://your-site.com/pending'
        },
        auto_return: 'approved',
    };

    const response = await preference.create({ body });
    return response.init_point; // This is the checkout URL
};
