import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';
import DeliverySpec from './DeliverySpec';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={DeliveriesList} />
            <Stack.Screen name="Details">
                {(screenProps) => <DeliverySpec {...screenProps} setDeliveries={props.setDeliveries} />}
            </Stack.Screen>
            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};