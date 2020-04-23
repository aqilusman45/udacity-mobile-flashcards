import React from "react";
import {
  Text,
  ContentTextWrapperCenter,
  ContentWrapperCenter,
} from "../Globals";

const NoCards = ({}) => (
  <ContentWrapperCenter>
    <ContentTextWrapperCenter>
      <Text
        style={{
          textAlign: "center",
          paddingLeft: 20,
          paddingRight: 20,
        }}
        color="black"
        size="20px"
      >
        Sorry, you cannot take a quiz because there are no cards in this deck.
      </Text>
    </ContentTextWrapperCenter>
  </ContentWrapperCenter>
);

export default NoCards;
