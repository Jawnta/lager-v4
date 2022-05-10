import Auth from "'../../interfaces/auth";
import { useState } from 'react';
import { login } from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";
export default function Login({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    const doLogin = async () => {
        if (auth.email && auth.password) {
            const result = await login(auth.email, auth.password);
            if (result.type === "success") {
                setIsLoggedIn(true);
            }
            showMessage(result);
        } else {
            showMessage({
            message: "Saknas",
            description: "E-post eller lösenord saknas",
            type: "warning",
        });
    }
    };

    return (
        <AuthFields 
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        
        />
    )

};