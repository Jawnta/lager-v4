import config from "../config/config.json";
import { Invoice } from "../interfaces/invoice";
import { readToken } from "./storage";


export async function getInvoices():Promise<Invoice[]> {
    const token = await readToken();
    const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
        headers: {
            'x-access-token': `${token.token}`
        }
    });
    const result = await response.json();
    return result.data;
};

export async function postInvoice(data: Omit<Invoice, "id">) {
    const token = await readToken();
    const requestOptions:RequestInit = {
        method: 'POST',
        headers: { 'x-access-token': `${token.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: data.order_id, total_price: data.total_price, creation_date: data.creation_date, due_date: data.due_date, api_key: config.api_key })
    };
    await fetch(`${config.base_url}/invoices`, requestOptions);
    return true;
}