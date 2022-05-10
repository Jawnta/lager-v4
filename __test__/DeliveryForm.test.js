import { render, fireEvent } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

const mockSubmit = jest.fn();

test('Testing text and fields for DeliveryForm', async () => {
    const fieldLabels = ["Produkt", "Antal", "Leverans datum", "Kommentar"];

    const { getByText, getByTestId } = render(<DeliveryForm/>);

    fieldLabels.forEach(async (element) => {
        const elementToTest = await getByText(element);
        expect(elementToTest).toBeDefined();
    });

    const fieldIds = ["productDropdown", "amountField", "dateDropdown", "commentField"];

    fieldIds.forEach(async (id) => {
        const fieldToTest = await getByTestId(id);
        expect(fieldToTest).toBeDefined();
    });
    const submitButton = await getByTestId("deliveryButton");
    expect(submitButton).toBeDefined();

});