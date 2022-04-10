import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import screws from '../assets/screws.webp';
import Stock from '../components/Stock';
import { Base, Typography } from '../styles';

// ec1fc827a98f58f27bc93c7318bcda16

export default function Home({products, setProducts}) {
  return (
    <SafeAreaView style={Base.container}>
      <ScrollView style={Base.base}>
        <Text style={Typography.header1}>Skruv Lagret</Text>
        <Image source={screws} style={Base.img} />
        <Stock products={products} setProducts={setProducts} />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}