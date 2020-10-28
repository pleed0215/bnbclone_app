import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import styled from "styled-components/native";
import DismissKeyboard from "../../../Components/DismissKeyboard";

import ThemeColor from "../../../color";
import { ActivityIndicator } from "react-native";
import api from "../../../api";

const Container = styled.View`
  padding: 0px 20px;
  align-items: center;
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
  margin-right: 10px;
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

const SearchButton = styled.TouchableOpacity`
  width: 90%;
  height: 40px;
  background-color: ${ThemeColor.red};
  align-items: center;
  border-radius: 10px;
`;

const SearchButtonText = styled.Text`
  padding: 10px 20px;
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const ResultContainer = styled.ScrollView`
  width: 100%;
  background-color: ${ThemeColor.red};

  margin-top: 20px;
`;

const IndicatorContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const SEARCH_INPUT = 1,
  SEARCH_PENDING = -1,
  SEARCH_COMPLETE = 0;

const Presenter = ({ token }) => {
  const navigation = useNavigation();
  const [beds, setBeds] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const [searchState, setSearchState] = useState(SEARCH_INPUT);

  const submit = async () => {
    const form = {
      ...(beds && { beds: parseInt(beds, 10) }),
      ...(bedrooms && { bedrooms: parseInt(bedrooms, 10) }),
      ...(bathrooms && { bathrooms: parseInt(bathrooms, 10) }),
      ...(minPrice && { min_price: parseInt(minPrice, 10) }),
      ...(maxPrice && { max_price: parseInt(maxPrice, 10) }),
    };
    setSearchState(SEARCH_PENDING);
    try {
      const { data } = await api.search(token, form);
      console.log(data);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchState(SEARCH_COMPLETE);
    }

    setTimeout(() => setSearchState(SEARCH_COMPLETE), 4000);
  };

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
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <FilterContainer>
            <FilterLabel>Beds</FilterLabel>
            <Filter
              value={beds}
              onChangeText={(text) => setBeds(text)}
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bedrooms</FilterLabel>
            <Filter
              value={bedrooms}
              onChangeText={(text) => setBedrooms(text)}
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bathrooms</FilterLabel>
            <Filter
              value={bathrooms}
              onChangeText={(text) => setBathrooms(text)}
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Min. price</FilterLabel>
            <Filter
              value={minPrice}
              onChangeText={(text) => setMinPrice(text)}
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Max. price</FilterLabel>
            <Filter
              value={maxPrice}
              onChangeText={(text) => setMaxPrice(text)}
              keyboardType={"number-pad"}
            />
          </FilterContainer>
        </FiltersContainer>
        <SearchButton onPress={() => submit()}>
          <SearchButtonText>Search</SearchButtonText>
        </SearchButton>
        {searchState !== SEARCH_INPUT && (
          <ResultContainer>
            {searchState === SEARCH_PENDING && (
              <IndicatorContainer>
                <ActivityIndicator size="large" />
              </IndicatorContainer>
            )}
            {searchState === SEARCH_COMPLETE && (
              <FilterLabel>Complete</FilterLabel>
            )}
          </ResultContainer>
        )}
      </Container>
    </DismissKeyboard>
  );
};

export default Presenter;
