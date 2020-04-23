import React, {useState, useEffect} from 'react';
import {Alert, Button, View} from 'react-native';
import {Text, ContentTextWrapperCenter, ContentWrapperCenter} from '../Globals';
import {connect} from 'react-redux';

const Quiz = ({rootNavigation, deck, rootRoute, navigation, dispatch}) => {
  const [currentIndex, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIndex(0);
      setIsLast(false);
      setScore(0);
    });
    return unsubscribe;
  }, [navigation]);

  rootNavigation.setOptions({
    tabBarVisible: false,
  });
  navigation.setOptions({
    headerTitle: `${deck?.title} Quiz` || '',
  });

  const {questions} = deck;

  const handleAnswer = option => {
    if (option === 'correct') {
      setScore(prevScore => prevScore + 1);
    }
    if (questions[currentIndex + 1] !== undefined) {
      setIndex(prevIdx => prevIdx + 1);
    } else {
      setIsLast(true);
    }
  };

  useEffect(() => {
    const navigate = score => {
      navigation.navigate('Final Score', {
        score,
        deckId: deck.id,
        total: questions.length,
      });
    };
    if (isLast) {
      navigate(score);
    }
  }, [isLast, score, navigation]);

  if (questions.length === 0) {
    return (
      <ContentWrapperCenter>
        <ContentTextWrapperCenter>
          <Text
            style={{
              textAlign: 'center',
              paddingLeft: 20,
              paddingRight: 20,
            }}
            color="black"
            size="20px">
            Sorry, you cannot take a quiz because there are no cards in this
            deck.
          </Text>
        </ContentTextWrapperCenter>
      </ContentWrapperCenter>
    );
  }

  return (
    <ContentWrapperCenter>
      <Text
        style={{
          textAlign: 'left',
          marginTop: 20,
        }}
        color="black"
        size="20px">
        Question {currentIndex + 1} out of {questions.length}
      </Text>
      <ContentTextWrapperCenter>
        <Text
          style={{
            textAlign: 'center',
          }}
          color="black"
          size="30px">
          {questions[currentIndex].question}
        </Text>
        <Text
          onPress={() => {
            Alert.alert('Answer', questions[currentIndex].answer);
          }}
          style={{
            marginTop: 20,
          }}
          color="red"
          size="15px">
          View Answer
        </Text>
        <View
          style={{
            marginTop: 10,
          }}>
          <Button
            onPress={() => handleAnswer('correct')}
            title="  Correct   "
          />
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <Button
            onPress={() => handleAnswer()}
            color="black"
            title="Incorrect"
          />
        </View>
      </ContentTextWrapperCenter>
    </ContentWrapperCenter>
  );
};

const mapStateToProps = ({decks}, {route}) => {
  const {params} = route;
  const deck = Object.values(decks).find(deck => deck.id === params.deckId);
  return {
    deck,
  };
};

export default connect(mapStateToProps)(Quiz);
