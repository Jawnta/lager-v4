import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from '../styles';
import { Invoice } from '../interfaces/invoice';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getInvoices, postInvoice } from '../models/invoices';
import { Order } from '../interfaces/order';
import orders, { getPackedAndSentOrders, billOrder } from "../models/orders";

const saveModel = {

} as Omit<Invoice, "id">;

const customerOrder = {
    id: null,
    name: null    
}

function ProductDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);

    let ordersHash: any = {};

    useEffect(async () => {
        setOrders(await getPackedAndSentOrders());
    }, []);
    
    const orderList = orders.map((order, index) => {
        ordersHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.orders?.order.id}
            onValueChange={(itemValue) => {
                saveModel.order_id = itemValue;
                customerOrder.id = itemValue;
                customerOrder.name = ordersHash[itemValue].name;
                saveModel.total_price = getTotalOrderPrice(ordersHash[itemValue]);
            }}
        >
            {orderList}
        </Picker>
    )
}

const getTotalOrderPrice = (order: Order) => {
    return order.order_items.reduce((previousValue, currentValue) => {
        return previousValue + (currentValue.price * currentValue.amount);

    }, 0);

};


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
                        const selectedDate = date;
                        const addToDate = new Date(date);
                        saveModel.creation_date = selectedDate.toLocaleDateString("se-SV");
                        const dateInMs = addToDate.setDate(selectedDate.getDate() + 30);
                        saveModel.due_date = new Date(dateInMs).toLocaleDateString("se-SV");
                        setShow(false);                        
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}




export default function InvoiceForm({ navigation, setProducts }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});


    const addInvoice = async () => {
        await postInvoice(saveModel);
        await billOrder(customerOrder.id, customerOrder.name);
        navigation.navigate("List", { reload: true });
    };

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny faktura</Text>

            <Text style={{ ...Typography.label }}>Namn</Text>
            <ProductDropDown/>
              <Text style={{ ...Typography.label }}>Faktura datum</Text>
            <DateDropDown/>

            <Button
                title="Skapa faktura"
                onPress={() => {
                    addInvoice();
                }}
            />
        </ScrollView>
    );
};