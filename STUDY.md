## 6.2 Preloading image

### Assets Loading and <AppLoading />

- <AppLoading />
    - document 확인
- 강의 처음부터 assets에 대해서 나온다.
  - assets이 file 타입인지, 링크 타입인지 검사해서 assets을 loading
  - assets이 file이면 expo-assets이라는 라이브러리를 이용하여 assets을 관리한다.
- prefetchImage에 대해서..
  ```js
  const cacheImage = (images) =>
    images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      }
      // react native의 Image class를 이용하는 것이라 한다.
      else {
        return Assets.fromModule(image).downloadAsync();
      }
    });
  ```

### @expo/vetor-icons

- fontawesome icons와 비슷한거 인듯..
- npm install @expo/vector-icons
- https://icons.expo.fyi/
- 강의에서는 ionicons사용할 거라 한다.

### prefetch Font

- 뭘 계속 설치 하노..
- expo install expo-font (npm install expo-font)

```js
const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
```

- asset 로딩

# 7 REDUX SETUP

## 7.0 userSlice

- Components/Gate.js 만듬.
- 로그인 준비
- redux toolkit 설치
  ```sh
    npm install @reduxjs/toolkit
    npm install redux
    npm install react-redux
  ```

## redux-toolkit

- createSlice 만들기
- rootSlice에서 combineReducers로 rootSlice만들기
- store 만들기
- Provider로 store react와 연결하기.
- Component에서 mapStateToProps, connect로 component 와 연결하기.
  - mapStateToProps, connect와 관련해서 코드를 줄이는 방법으로는 react-redux 라이브러리의 useSelector를 이용하는 것.
  - dispatch 사용 하려면 -> useDispatch
