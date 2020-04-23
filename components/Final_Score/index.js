import React from 'react';
import {View, Button} from 'react-native';
import {ContentTextWrapperCenter, ContentWrapperCenter, Text} from '../Globals';

const FinalScore = ({
  rootNavigation,
  rootRoute,
  navigation,
  dispatch,
  route,
}) => {
  rootNavigation.setOptions({
    tabBarVisible: false,
  });
  navigation.setOptions({
    headerTitle: 'Results',
  });
  const {score, deckId, total} = route.params;
  console.log(route);

  return (
    <ContentWrapperCenter>
      <ContentTextWrapperCenter>
        <Text color="black" size="20px">
          Your score for the quiz
        </Text>
        <Text color="black" size="30px">
          {(score / total) * 100}%
        </Text>
        <View
          style={{
            marginTop: 10,
          }}>
          <Button
            onPress={() => {
              navigation.navigate('View Deck', {
                deckId,
              });
            }}
            title="Back to Deck"
          />
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <Button
            onPress={() =>
              navigation.navigate('Start Quiz', {
                deckId,
              })
            }
            color="black"
            title="Restart Quiz"
          />
        </View>
      </ContentTextWrapperCenter>
    </ContentWrapperCenter>
  );
};

export default FinalScore;
