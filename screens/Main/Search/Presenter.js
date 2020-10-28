import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../../Components/DismissKeyboard";

const Container = styled.View`
  padding: 0px 20px;
`;
const SearchContainer = styled.View`
  margin-top: 50px;
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchBar = styled.TextInput`
  height: 40px;
  width: 80%;
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 5px 10px;
  background-color: white;
  justify-content: center;
`;

const CancelContainer = styled.TouchableOpacity``;
const CancelText = styled.Text``;

const FiltersContainer = styled.ScrollView`
  flex-direction: row;
  margin-top: 15px;
`;

const FilterContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;
const FilterLabel = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Filter = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 3px 3px rgba(100, 100, 100, 0.5);
  min-width: 100px;
  text-align: center;
`;

const Presenter = () => {
  const navigation = useNavigation();
  return (
    <DismissKeyboard>
      <Container>
        <SearchContainer>
          <SearchBar autoFocus={true} placeholder={"Search by city..."} />
          <CancelContainer onPress={() => navigation.goBack()}>
            <CancelText>Cancel</CancelText>
          </CancelContainer>
        </SearchContainer>
        <FiltersContainer
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
        >
          <FilterContainer>
            <FilterLabel>Beds</FilterLabel>
            <Filter keyboardType={"number-pad"} />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bedrooms</FilterLabel>
            <Filter keyboardType={"number-pad"} />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bathrooms</FilterLabel>
            <Filter keyboardType={"number-pad"} />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Min. price</FilterLabel>
            <Filter keyboardType={"number-pad"} />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Max. price</FilterLabel>
            <Filter keyboardType={"number-pad"} />
          </FilterContainer>
        </FiltersContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default Presenter;
