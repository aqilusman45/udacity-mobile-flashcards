import React, {useState} from 'react';
import {Text} from '../Globals';
import {
  AddDeckWrapper,
  DeckTitleInput,
  SubmitBtn,
  BtnContainer,
} from './styled_componets';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {setNewDeck} from '../../store/actions/decks';

const AddDeck = ({dispatch, navigation}) => {
  const [title, setTitle] = useState('');

  const submit = () => {
    if (title === '') {
      return alert(`Title can't be empty.`);
    }
    dispatch(
      setNewDeck(title, id => {
        Keyboard.dismiss();
        setTitle('');
        navigation.navigate('View Deck', {
          deckId: id,
        });
      }),
    );
  };

  const handleChange = val => {
    setTitle(val);
  };

  return (
    <AddDeckWrapper>
      <Text color="black" size="20px">
        What is the title of your new Deck?
      </Text>
      <DeckTitleInput value={title} onChangeText={val => handleChange(val)} />
      <BtnContainer>
        <SubmitBtn onPress={submit} title="Create Deck" />
      </BtnContainer>
    </AddDeckWrapper>
  );
};

export default connect()(withNavigation(AddDeck));
