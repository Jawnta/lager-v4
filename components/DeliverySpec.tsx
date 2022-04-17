import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { Delivery } from '../interfaces/delivery';
import { getDeliveries } from '../models/delivery';
import { Base, Typography } from '../styles';


export default function DeliverySpec({ route, navigation, setDeliveries }) {
    const data = route.params;

    return (
        
        <View>
            <Text>Leverans id</Text>
            <Text>{data.deliveryId}</Text>
            <Text>Produkt id</Text>
            <Text>{data.deliverProduct}</Text>
            <Text>Produkt namn</Text>
            <Text>{data.deliveryName}</Text>
            <Text>Leverans datum</Text>
            <Text>{data.deliveryDate}</Text>
            <Text>Kommentar</Text>
            <Text>{data.deliveryComment}</Text>

            

        </View>
    )
};
