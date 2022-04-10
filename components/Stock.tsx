import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import { getProducts } from '../models/products';
import { Typography } from '../styles';

function StockList({ products, setProducts }) {

  console.log('mounted');
  useEffect(async () => {
    console.log('UseEffect');
    const products = await getProducts();
    setProducts(products);
  }, []);

  console.log('Stocklist', products);


  const list = products.map((product, index) => <Text key={index}>{product.name}, Saldo: {product.stock}</Text>);

  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock({ products, setProducts }) {
  return (
    <View>
      <Text style={Typography.header4}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </View>
  );
}