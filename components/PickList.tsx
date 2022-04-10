import { View, Text, Button } from "react-native";
import { Order } from "../interfaces/order";
import orderModel from "../models/orders";
import { getProducts, updateProductStock } from "../models/products";
import { useState, useEffect } from 'react';


export default function PickList({ route, navigation, setProducts }) {
    console.log('setProducts', setProducts);
    const order:Order  = route.params.order;
    const [productsList, setProductsList] = useState([]);

    async function setProduct() {
        const products = await getProducts();
        setProductsList(products as any);
    }

    useEffect(() => {
        setProduct();
    }, []);
    

    async function pick() {
        await orderModel.pickOrder(order.id, order.name);
    
        const updateStockPromises = order.order_items.map((product) => {
            const stockUpdate = product.stock - product.amount;
            return updateProductStock(product.product_id, product.name, stockUpdate);

        });
        
        await Promise.all(updateStockPromises);
        
        const products = await getProducts();
        setProducts(products);
        
        navigation.navigate("List", { reload: true });
    }

    const renderButtonOrText = () => {
        const allProductsInStock = order.order_items.every(x => x.amount <= x.stock )
        if (allProductsInStock) {
            return <Button title="Plocka order" onPress={pick} />
        } else {
            return <Text>En eller flera produkter finns ej i lager.</Text>
        }
    };

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}
            { renderButtonOrText() }
        </View>
    )
};