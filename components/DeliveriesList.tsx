import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { Delivery } from '../interfaces/delivery';
import { getDeliveries } from '../models/delivery';
import { Base, Typography } from '../styles';
import config from "./../config/config.json";

export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState<Delivery[]>([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllDeliveries(await getDeliveries());
    }

    useEffect(() => {
        reloadOrders();
    }, []);
    

    useEffect(() => {
        fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
          .then(response => response.json())
          .then(result => setAllDeliveries(result.data));
    }, []);
    
    const listOfDeliveries = allDeliveries
    .map((delivery, index) => {
        return <Button
            title={delivery.product_name + " " + delivery.delivery_date}
            key={index}
            onPress={() => {
                navigation.navigate('Details', {
                    deliveryId: delivery.id,
                    deliverProduct: delivery.product_id,
                    deliveryName: delivery.product_name,
                    deliveryDate: delivery.delivery_date,
                    deliveryComment: delivery.comment

                });
            }}
        />
    });

if (listOfDeliveries.length === 0){
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
    
            <Text>Det finns tyvärr inga leveranser ännu :(</Text>
            <Button
                title={"Ny inleverans"}
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </View>
    );

}
return (
    <View style={Base.base}>
        <Text style={Typography.header2}>Inleveranser</Text>

        {listOfDeliveries}
        <Button
            title={"\nNy inleverans"}
            onPress={() => {
                navigation.navigate('Form');
            }}
        />
    </View>
);

}