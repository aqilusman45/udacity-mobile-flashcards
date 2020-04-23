import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

const DECKS_STORAGE_KEY = "UdaciCards:decks";
export const addDeck = async (title) => {
  const uid = generateUID();
  try {
    AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title.toLowerCase()]: {
          id: uid,
          title: title,
          timeStamp: Date.now(),
          questions: [],
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
  return uid;
};

export const getDecks = async () => {
  return JSON.parse((await AsyncStorage.getItem(DECKS_STORAGE_KEY)) || "{}");
};

export const getDeck = async (key) => {
  const decks = await getDecks();
  return decks[key];
};

export const saveUpdatedDeck = async (title, deck) => {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title.toLowerCase()]: deck,
    })
  );
};

export const addCardToDeck = async (title, card) => {
  const decks = await getDecks();
  const deckToUpdate = decks[title.toLowerCase()];
  deckToUpdate.questions.push(card);
  return saveUpdatedDeck(title, deckToUpdate);
};

export const removeDeckFromDecks = async (title) => {
  const decks = await getDecks();
  delete decks[title.toLowerCase()];
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
};

const NOTIFICATIONS_STORAGE_KEY = "UdaciCards:notifications";

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATIONS_STORAGE_KEY).then(
    Notifications.cancelScheduledNotificationAsync
  );
};

const createNotification = async () => {
  return {
    title: "Ready to learn?",
    body: "👋 atempt atleast one quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
};

export const setLocalNotifications = async () => {
  console.log("calling notification");

  const data = JSON.parse(
    await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
  );
  console.log("data", data);

  if (data === null) {
    Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({ status }) => {
        console.log("status", status);
        if (status === "granted") {
          Notifications.cancelScheduledNotificationAsync();

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20);
          tomorrow.setMinutes(0);

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time: tomorrow,
            repeat: "day",
          });

          AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(true));
        }
      })
      .catch(console.log);
  }
};
