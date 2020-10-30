import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import styled from "styled-components/native";
import DismissKeyboard from "../../../Components/DismissKeyboard";

import ThemeColor from "../../../color";
import { ActivityIndicator } from "react-native";
import RoomPhoto from "../../../Components/RoomPhoto";
import api from "../../../api";
import utils from "../../../utils";

const Container = styled.View`
  padding: 0px 0px;
  align-items: center;
  width: 100%;
`;
const SearchContainer = styled.View`
  margin-top: 50px;
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 300px;
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
  background-color: ${({ green }) =>
    green ? ThemeColor.green : ThemeColor.red};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: 10px;
`;

const SearchButtonText = styled.Text`
  padding: 10px 20px;
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const ResultContainer = styled.ScrollView`
  margin-top: 20px;
  width: 100%;
  height: 600px;
`;

const IndicatorContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Result = styled.View`
  margin-bottom: 20px;
  width: 100%;
  height: ${utils.screenHeight / 5}px;
  border-radius: 20px;
`;

const ResultCount = styled.Text`
  margin: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const ResultInfoContainer = styled.View`
  flex-direction: row;
  margin-left: 10px;
`;

const ResultInfoName = styled.Text`
  font-size: 15px;
  margin-left: 10px;
`;

const ResultInfoProperty = styled.Text`
  margin-left: 10px;
  padding: 2px 5px;
  background-color: ${ThemeColor.green};
  color: white;
  border-radius: 5px;
  overflow: hidden;
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
  const [resultCount, setResultCount] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState();
  const [searchState, setSearchState] = useState(SEARCH_INPUT);

  const searchArray = [];

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
      const {
        data: { results, count, next },
      } = await api.search(token, form);
      setSearchResult([]);
      setSearchResult(results);
      setNextUrl(next);
      setResultCount(count);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchState(SEARCH_COMPLETE);
    }
  };

  const loadMoreResult = async () => {
    setMoreLoading(true);
    console.log(nextUrl);
    try {
      const {
        data: { results, next },
      } = await api.callApi("get", nextUrl, null, token, true);
      setNextUrl(next);
      setSearchResult([...searchResult, ...results]);
    } catch (e) {
      console.error(e);
    } finally {
      setMoreLoading(false);
    }
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
          <ResultContainer contentContainerStyle={{ alignItems: "center" }}>
            {searchState === SEARCH_PENDING && (
              <IndicatorContainer>
                <ActivityIndicator size="large" />
              </IndicatorContainer>
            )}
            {searchState === SEARCH_COMPLETE && resultCount > 0 && (
              <>
                <ResultCount>Result: found {resultCount}</ResultCount>

                {searchResult.map((room) => (
                  <Result key={room.id}>
                    <RoomPhoto photos={room.photos} room={room} factor={6} />
                    <ResultInfoName>{room.name}</ResultInfoName>
                    <ResultInfoContainer>
                      <ResultInfoProperty>${room.price}/day</ResultInfoProperty>
                      <ResultInfoProperty>
                        {utils.plural(room.beds, "bed")}
                      </ResultInfoProperty>
                      <ResultInfoProperty>
                        {utils.plural(room.bedrooms, "bedroom")}
                      </ResultInfoProperty>
                      <ResultInfoProperty>
                        {utils.plural(room.bathrooms, "bathroom")}
                      </ResultInfoProperty>
                    </ResultInfoContainer>
                  </Result>
                ))}
                {searchResult.length !== resultCount && (
                  <SearchButton green onPress={() => loadMoreResult()}>
                    {moreLoading ? (
                      <ActivityIndicator size="small" />
                    ) : (
                      <SearchButtonText>Load More</SearchButtonText>
                    )}
                  </SearchButton>
                )}
              </>
            )}
          </ResultContainer>
        )}
      </Container>
    </DismissKeyboard>
  );
};

export default Presenter;
