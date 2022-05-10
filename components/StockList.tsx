import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { getProducts } from '../models/products';

export default function StockList({ products, setProducts }) {

    useEffect(async () => {
      const products = await getProducts();
      setProducts(products);
    }, []);
  
    const list = products.map((product, index) => <Text key={index}>{product.name}, Saldo: {product.stock}</Text>);
  
    return (
      <View>
        {list}
      </View>
    );
  }