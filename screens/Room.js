import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Text = styled.Text``;

export default ({ route }) => {
  const {
    params: { room },
  } = route;

  console.log(room);

  return (
    <Container>
      <Text>Room</Text>
    </Container>
  );
};
