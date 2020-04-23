import React, {useState} from 'react';
import {Text} from '../Globals';
import {
  AddDeckWrapper,
  DeckTitleInput,
  SubmitBtn,
  BtnContainer,
} from '../Add_A_Deck/styled_componets';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {addCard} from '../../store/actions/decks';

const AddCard = ({rootNavigation, rootRoute, navigation, dispatch, route}) => {
  const {params} = route;

  rootNavigation.setOptions({
    tabBarVisible: false,
  });
  navigation.setOptions({
    headerTitle: 'Add Card',
  });
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const submit = () => {
    if (question === '') {
      return alert(`Question can't be empty.`);
    }
    if (answer === '') {
      return alert(`Answer can't be empty.`);
    }
    dispatch(
      addCard(
        {
          answer,
          question,
          title: params.title,
        },
        () => {
          Keyboard.dismiss();
          setAnswer('');
          setQuestion('');
          navigation.navigate('View Deck');
        },
      ),
    );
  };

  const handleQuestion = val => {
    setQuestion(val);
  };

  const handleAnswer = val => {
    setAnswer(val);
  };

  return (
    <AddDeckWrapper>
      <Text color="black" size="20px">
        Add a question and its answer.
      </Text>
      <DeckTitleInput
        placeholder="Question"
        value={question}
        onChangeText={val => handleQuestion(val)}
      />
      <DeckTitleInput
        placeholder="Answer"
        value={answer}
        onChangeText={val => handleAnswer(val)}
      />
      <BtnContainer>
        <SubmitBtn onPress={submit} title="Submit Card" />
      </BtnContainer>
    </AddDeckWrapper>
  );
};

export default connect()(AddCard);
