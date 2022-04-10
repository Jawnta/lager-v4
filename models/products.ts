import config from "../config/config.json";
import { Product } from "../interfaces/product";

export async function getProducts():Promise<Product[]> {
    const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
    const result = await response.json();
    return result.data;
};

export async function getProduct(productId: number):Promise<Product> {
    const response = await fetch(`${config.base_url}/products/${productId}?api_key=${config.api_key}`);
    const result = await response.json();
    return result.data;

}

export async function updateProductStock(id: number, name: string, stock:number) {
    const requestOptions:RequestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, stock, api_key: config.api_key })
    };
    await fetch(`${config.base_url}/products`, requestOptions);
    return true;
}
