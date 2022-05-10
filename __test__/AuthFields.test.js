import { render, fireEvent } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth;
};
const mockSubmit = jest.fn();
const navigation = () => false;

test('Testing authfield for login', async () => {
    const title = "Logga in";

    const { getAllByText, getByTestId } = render(<AuthFields 
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    
    />);
    const titleElements = await getAllByText(title);
    
    expect(titleElements.length).toBe(2);

    const emailField = await getByTestId("emailField");
    const passwordField = await getByTestId("passwordField");

    expect(emailField).toBeDefined();
    expect(passwordField).toBeDefined();

    const loginButton = await getByTestId("loginButton");

    expect(loginButton).toBeDefined();

    const testEmail = "test@test.se";
    fireEvent.changeText(emailField, testEmail);
    expect(auth?.email).toEqual(testEmail);

    const testPass = "test";
    fireEvent.changeText(passwordField, testPass);
    expect(auth?.password).toEqual(testPass);

    fireEvent.press(loginButton);
    expect(mockSubmit).toHaveBeenCalled();

});