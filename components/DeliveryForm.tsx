import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View  } from "react-native";
import { Base, Typography, Forms } from '../styles';
import { Delivery } from '../interfaces/delivery';
import { Product } from '../interfaces/product';
import { Picker } from '@react-native-picker/picker';
import { getProducts, updateProductStock, getProduct } from "../models/products";
import { postDelivery } from "../models/delivery";
import DateTimePicker from '@react-native-community/datetimepicker';

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}




export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
       const [productsList, setProductsList] = useState([]);

    async function setProduct() {
        const products = await getProducts();
        setProductsList(products as any);
    }

    useEffect(() => {
        setProduct();
    }, []);

    async function addDelivery(delivery) {
        await postDelivery(delivery.product_id, delivery.amount, delivery.delivery_date, delivery.comment);
        const product = await getProduct(delivery.product_id);
        const updatedStock = product.stock + delivery.amount;
        await updateProductStock(product.id, product.name, updatedStock);
        const products = await getProducts();
        setProducts(products);
        navigation.navigate("List", { reload: true });
    }

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />
            <Text style={{ ...Typography.label }}>Leverans datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />
            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery(delivery);
                }}
            />
        </ScrollView>
    );
};