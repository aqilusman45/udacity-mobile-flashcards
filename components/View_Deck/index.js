import React from 'react';
import {ContentTextWrapperCenter, ContentWrapperCenter, Text} from '../Globals';
import {Button, View} from 'react-native';
import {connect} from 'react-redux';
import {removeFromDeck} from '../../store/actions/decks';
import {Loading} from '../Loading';

const ViewDeck = ({
  rootNavigation,
  deck,
  rootRoute,
  navigation,
  dispatch,
  loading,
}) => {
  rootNavigation.setOptions({
    tabBarVisible: false,
  });
  navigation.setOptions({
    headerTitle: deck?.title || '',
  });

  const removeDeck = title => {
    try {
      dispatch(
        removeFromDeck(title, () => {
          navigation.navigate('Decks');
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ContentWrapperCenter>
      <ContentTextWrapperCenter>
        <Text color="black" size="30px">
          {deck.title}
        </Text>
        <Text color="black" size="15px">
          {deck.questions.length} cards
        </Text>
        <View style={{margin: 20}}>
          <Button
            onPress={() =>
              navigation.navigate('Add Card', {
                title: deck.title,
              })
            }
            title="Add card"
          />
        </View>
        <View style={{margin: 20}}>
          <Button
            onPress={() =>
              navigation.navigate('Start Quiz', {
                deckId: deck.id,
              })
            }
            title="Start Quiz"
          />
        </View>
        <View style={{margin: 20}}>
          <Button
            color="black"
            onPress={() => removeDeck(deck.title)}
            title="Delete card"
          />
        </View>
      </ContentTextWrapperCenter>
    </ContentWrapperCenter>
  );
};

const mapStateToProps = ({decks, loading}, {route}) => {
  const {params} = route;
  const deck = Object.values(decks).find(deck => deck.id === params.deckId);
  return {
    deck,
    loading,
  };
};
export default connect(mapStateToProps)(ViewDeck);
