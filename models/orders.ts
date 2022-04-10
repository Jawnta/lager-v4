import config from "../config/config.json";
import { Order } from "../interfaces/order";


const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    pickOrder: async function pickOrder(orderId: number, name: string) {
        const requestOptions:RequestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: orderId, name, status_id: 200, api_key: config.api_key })
        };
        await fetch(`${config.base_url}/orders`, requestOptions);
        return true;
    }
    
};

export default orders;