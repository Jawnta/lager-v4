import { render } from '@testing-library/react-native';
import PickList from '../components/PickList';

const products = [
    { name: "Anders"},
    { name: "Kalle"},
    { name: "Olof"},
];
const orders = {order_items: products};
const params = {order: orders};
const route = {params: params};

const order = {
    order_items:[
        { name: "Anders"},
        { name: "Kalle"},
        { name: "Olof"},
    ]
}



const navigation = () => false;

const setProducts = () => false;

test('List should contain three names', async () => {
    const { getByText } = render(<PickList products={products} setProducts={setProducts} navigation={navigation} route={route} order={order}/>);

    const anders = await getByText('Anders', { exact: false });
    const kalle = await getByText('Kalle', { exact: false });
    const olof = await getByText('Olof', { exact: false });

    expect(anders).toBeDefined();
    expect(kalle).toBeDefined();
    expect(olof).toBeDefined();
});