import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { Invoice } from '../interfaces/invoice';
import { getInvoices } from '../models/invoices';
import { Base, Typography } from '../styles';
import config from "./../config/config.json";
import { DataTable } from "react-native-paper";
import { base } from '../styles/Base';
import { deleteToken, readToken } from '../models/storage';

export default function InvoiceList({ route, navigation}) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        const test = await getInvoices();
        setAllInvoices(test);
        
    }

    useEffect(() => {
        reloadInvoices();
    }, []);
    


    useEffect(() => {
        readToken().then(token => {
            fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                headers: {
                    'x-access-token': `${token.token}`
                }
            })
                .then(response => response.json())
                .then(result => setAllInvoices(result.data));
        })

    }, []);

    const logOut = async () => {
        deleteToken();
        navigation.navigate("Home", { reload: true });
    };

    const invoiceRows = (allInvoices || [])
        .map((invoice, index) => {
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{invoice.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                    <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
                </DataTable.Row>
            )
        });

    return (
        <ScrollView style={Base.base}>
            <View style={Base.base}>
                <Text style={Typography.header2}>Fakturor</Text>
                {invoiceRows}
                <Button 
                    title="Skapa faktura"
                    onPress={async () => {
                        navigation.navigate("Form");
                    }}
                />
                <Button 
                    title="Logga ut"
                    onPress={async () => {
                        await logOut();
                    }}
                />
            </View>
        </ScrollView>
    );
}