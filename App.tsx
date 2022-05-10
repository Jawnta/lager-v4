import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import Invoices from "./components/Invoices";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base } from './styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { loggedIn } from "./models/auth";
import Auth from './components/auth/Auth';
import Ship from './components/ship/Ship';
import FlashMessage from "react-native-flash-message";


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Home": "home",
  "Plock": "list",
  "Inleverans": "car",
  "Logga in": "lock-closed",
  "Faktura": "cash-outline",
  "Leverans": "map"
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(async () => {
    setIsLoggedIn(await loggedIn());
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Base.container}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
          >
            <Tab.Screen name="Home">
              {() => <Home products={products} setProducts={setProducts} />}
            </Tab.Screen>
            <Tab.Screen name="Plock">
              {() => <Pick products={products} setProducts={setProducts} />}
            </Tab.Screen>
            <Tab.Screen name="Inleveranser">
              {() => <Deliveries deliveries={deliveries} setDeliveries={setDeliveries} products={products} setProducts={setProducts} />}
            </Tab.Screen>
            <Tab.Screen name="Skicka order">
              {() => <Ship products={products} setProducts={setProducts} />}
            </Tab.Screen>
            {isLoggedIn ?
            <Tab.Screen name="Faktura">
              {() => <Invoices invoices={invoices} setInvoices={setInvoices}/>}
            </Tab.Screen>:
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
            }
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
        <FlashMessage position="top" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
