import { View, Text, Button } from "react-native";
import { Order } from "../../interfaces/order";
import orderModel from "../../models/orders";
import { getProducts, updateProductStock } from "../../models/products";
import { useState, useEffect } from 'react';
import MapView, { Marker } from "react-native-maps";
import getCoordinates from "../../models/nominatim";
import { Base } from "../../styles";
import * as Location from "expo-location";


export default function ShipOrder({ route, navigation, setProducts }) {
    const order:Order  = route.params.order;
    const [productsList, setProductsList] = useState([]);
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await getCoordinates(`${order.address},${order.city}`);
            setMarker(<Marker 
                coordinate={{latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon)}}
                title={result[0].display_name}
            />)

        })();
    }, [])

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied.");
                return;
            }
            const currentLoc = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker 
                coordinate={{
                    latitude: currentLoc.coords.latitude,
                    longitude: currentLoc.coords.longitude,
                }}
                title="Min plats"
                pinColor="blue"
            />)

        })();
    }, [])

    async function setProduct() {
        const products = await getProducts();
        setProductsList(products as any);

    }

    useEffect(() => {
        setProduct();
    }, []);
    

    async function pick() {
        await orderModel.sendOrder(order.id, order.name);
    
        const products = await getProducts();
        setProducts(products);
        
        navigation.navigate("List", { reload: true });
    }


    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View style={Base.mapContainer}>
            <MapView
            style={Base.map}
            initialRegion={{
                latitude:56.1612,
                longitude: 15.5869,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            }}
            >
                
                {marker}
                {locationMarker}
            </MapView>

            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}
            
            <Button title="Skicka order" onPress={pick} />
        </View>

    )
};
