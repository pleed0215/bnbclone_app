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

- 1. Components/Gate.js 만듬.
- 2. 로그인 준비
- 3. redux toolkit 관련 라이브러리 설치
  ```sh
    npm install @reduxjs/toolkit
    npm install redux
    npm install react-redux
  ```

## redux-toolkit

- 1. createSlice 만들기
- 2. rootSlice에서 combineReducers로 rootSlice만들기
- 3. store 만들기
- 4. Provider로 store react와 연결하기.
- 5. Component에서 mapStateToProps, connect로 component 와 연결하기.
  - mapStateToProps, connect와 관련해서 코드를 줄이는 방법으로는 react-redux 라이브러리의 useSelector를 이용하는 것.
  - dispatch 사용 하려면 -> useDispatch

### redux-persist?

- redux data를 저장함으로써, 새로고침이나 추후에 다시 앱을 로딩 했을 때에도 데이터를 유지해주는 것으로 이해하면 될까?
- [링크](https://github.com/rt2zz/redux-persist)
- settings을 먼저 해줘야 한다.
  #### storage
  - setting에 보면 storage가 있는데, sotrage에는 localStorage, sessionStorage, AsyncStorage, .. 등등 많이 있음.
  - [참고](https://github.com/rt2zz/redux-persist#storage-engines)
  - localStorage - 핸드폰? 로컬? 에 저장. redux-persist/lib/storage
  - sessionStorage - redux-persist/liub/storage/session 아마도 db 세션을 말하는걸까? 아니면 유저 세션?
  - AsyncStorage - 리액트 네이티브 용

```js
  const persistedReducer = persistReducer(persistConfig, rootReducer);</code>
  const store = configureStore ( {
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  });

  const persistor = persistStore(store);
  });

```

    - 위 코드는 persistedReducer는 rootReducer가 변화가 있을 때마다 우리가 설정해 놓은 storage에 저장을 할 수 있는 오브젝트를 만드는 것.
    - 그리고 우리가 만든 store에는 rootReducer가 들어가 있는데, 이를 바꿔줘야 한다.
    - 위 middleware파트는 몰라도 되고 그냥 쓰면 된다고 하는데... 저거 없으면 에러가 나서 진행 못헌다.
      - redux toolkit과 redux persist 간에 문제? 이기 때문에 이를 무시하라는 것이라네.

    - 그다음 step으로 해줄 것.
      - App에서 설정해줄 것이 좀 있음.
      - 1. PersistGate (from redux-persist/integration/react)
        - rendering을 위해 state를 load할 때까지 기다려주는 component
        ```r
          <PersistGate loading={null} persistor={persistor}>
        ```
        - persistor는 persistStore로 만들었던 오브젝트.

### redux debug in expo

- download react native debugger fromm releases page.
- command+t or ctrl+t,
- 연결 후 ios 에서 command or ctrl + d를 눌러서 디버깅 연결.

# 8. Authentication

## 8.0 ~ 8.1 Auth navigation

### react-navigation library

- 설치 할 것이 많음.
- react navigation 홈페이지 참고해서 라이브러리들 설치.

- Start

  - navigation 폴더 만들고, Auth.js

    - createStackNavigator
    - Auth.Navigator
    - Auth.Screen.

    ```js
      <Auth.Screen name="Welcome" component={Welcome} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    ```

    - 위에 있는 순서대로 먼저 화면에 나타나는 것.

  - Navigator 렌더링을 Gate에서 해주면.

        - 에러가 난다.
        - Navigator는 NavigatorContainer로 wrapping 해야 한다.

        - Navigation 관련 props
          - mode: "card", "modal" 형 있음.
          - headerMode: "float", "screen" 글자만 이동? 혹은 화면 전체 이동?
          - screenOptions: .. 문서 찾아보셈.
            - 자주 사용하는 것.
            - headerBackTitleVisible: true, false,

    ![그림](screenshot.png)

    - 중요한 props는 navigation

      - navigation.navigate(screen name) 하면 스크린으로 이동함.

    - Ionicons -> react vector icon, name, size, color
    - Platform -> react native
