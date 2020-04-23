import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from '../../utils/helpers';
import {
  NavBtn,
  ListItemContentWrapper,
  NavigateWrapper,
} from '../Decks/styled_components';
import {Text, ContentTextWrapperCenter, ContentWrapperCenter} from '../Globals';
import ViewDeck from '../View_Deck';
import {createStackNavigator} from '@react-navigation/stack';
import AddCard from '../Add_Card';
import {receiveData} from '../../store/actions/loading';
import {Loading} from '../Loading';
import Quiz from '../Quiz';
import FinalScore from '../Final_Score';

const Stack = createStackNavigator();

const DeckCards = ({decksList, navigation}) => {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 20,
        }}
        color="black"
        size="30px">
        UdaciCards
      </Text>
      <FlatList
        style={{flexGrow: 0}}
        data={decksList}
        keyExtractor={item => item.title}
        renderItem={props => <RenderItem navigation={navigation} {...props} />}
      />
    </View>
  );
};

const RenderItem = ({item, navigation}) => {
  return (
    <NavigateWrapper
      onPress={() =>
        navigation.navigate('View Deck', {
          deckId: item.id,
        })
      }
      activeOpacity={1}>
      <ListItemContentWrapper elevation={5} key={item.title}>
        <Text color="black" size="30px">
          {item.title}
        </Text>
        <Text color="black" size="13px">{`${item.questionCount} cards`}</Text>
      </ListItemContentWrapper>
    </NavigateWrapper>
  );
};

const Decks = ({decksList, navigation, dispatch, route, loading}) => {
  navigation.setOptions({
    tabBarVisible: true,
  });
  useEffect(() => {
    async function getData() {
      try {
        const decks = await getDecks();
        dispatch(receiveData(decks));
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(decksList).length === 0) {
    return (
      <ContentWrapperCenter>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
          }}
          color="black"
          size="30px">
          UdaciCards
        </Text>
        <ContentTextWrapperCenter>
          <Text color="black" size="30px">
            Welcome!
          </Text>
          <Text color="black" style={{margin: 15}} size="13px">
            You don't have any Decks to show.
          </Text>
          <NavBtn
            onPress={() => {
              navigation.navigate('Add a Deck');
            }}
            title={'start here'}
          />
        </ContentTextWrapperCenter>
      </ContentWrapperCenter>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Deck List">
        {props => <DeckCards decksList={decksList} {...props} />}
      </Stack.Screen>
      <Stack.Screen name="View Deck">
        {props => (
          <ViewDeck
            rootNavigation={navigation}
            rootRoute={route}
            route={props.route}
            navigation={props.navigation}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Add Card">
        {props => (
          <AddCard
            rootNavigation={navigation}
            rootRoute={route}
            route={props.route}
            navigation={props.navigation}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Start Quiz">
        {props => (
          <Quiz
            rootNavigation={navigation}
            rootRoute={route}
            route={props.route}
            navigation={props.navigation}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerLeft: ({canGoBack}) => false,
        }}
        name="Final Score">
        {props => (
          <FinalScore
            rootNavigation={navigation}
            rootRoute={route}
            route={props.route}
            navigation={props.navigation}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const mapStateToProps = ({decks, loading}) => {
  const decksList = Object.values(decks)
    .map(deck => ({
      title: deck.title,
      questionCount: deck.questions.length,
      timeStamp: deck.timeStamp,
      id: deck.id,
    }))
    .sort((a, b) => b.timeStamp - a.timeStamp);
  return {
    decksList,
    loading,
  };
};
export default connect(mapStateToProps)(Decks);
