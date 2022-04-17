import config from "../config/config.json";
import { Delivery } from "../interfaces/delivery";

export async function postDelivery(product_id: number, amount: number, delivery_date: Date, comment: string) {
    const requestOptions:RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id, amount, delivery_date, comment, api_key: config.api_key })
    };
    await fetch(`${config.base_url}/deliveries`, requestOptions);
    return true;
}

export async function getDeliveries():Promise<Delivery[]> {
    const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
    const result = await response.json();
    return result.data;
};