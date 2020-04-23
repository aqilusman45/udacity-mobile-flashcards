import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from "./components/Decks";
import { Provider } from "react-redux";
import store from "./store";
import AddDeck from "./components/Add_A_Deck";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { setLocalNotifications } from "./utils/helpers";
const Tabs = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    setLocalNotifications();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let IconName;

              if (route.name === "Decks") {
                IconName = () => (
                  <MaterialCommunityIcons
                    name={"cards-variant"}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "Add a Deck") {
                IconName = () => (
                  <AntDesign name={"addfile"} size={size} color={color} />
                );
              }

              // You can return any component that you like here!
              return <IconName />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#2196F3",
            inactiveTintColor: "gray",
          }}
        >
          <Tabs.Screen name="Decks" component={Decks} />
          <Tabs.Screen name="Add a Deck" component={AddDeck} />
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
