export interface OrderItem {
    product_id: number,
    amount: number,
    article_number: string,
    name: string,
    description: string,
    specifiers: Array<string>,
    stock: number,
    location: string,
    price: number
}
