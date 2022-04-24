import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthFields from './AuthFields';
import { register } from '../../models/auth';

export default function Register ({ navigation }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    const doRegister = async () => {
        if (auth.email && auth.password) {
            await register(auth.email, auth.password);
            navigation.navigate("Login");
        }
    };

    return (
        <AuthFields 
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        
        />
    )
}