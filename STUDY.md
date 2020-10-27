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

## 8.2 component를 만들 때

- 니코는 파일을 만드는 것보다, 폴더를 만들어서 만드는 것을 선호함.

### Back button component

1. styled component install
   - styled component import 할 때 "styled-components/native"로 임포트 할 것.
2. Image 컴포터넌트를 사용하였는데, pre loading한 이미지에서 가져오는 코드를 익혀놔야 할듯..
   ```js
     <Image source={require("../assets/login_splash.jpg")}/>
     <Image source={{uri: LOGO_URL}}/>
   ```
   - required 사용함.
   - resizeMethod로 이미지 크기를 조절할 수 있다. 근데 styled에서 조절하면 안되나??
     - 안됨. 없는 style옵션이라고 에러 나온다.
     - ?? 근데 resizeMethod 사용했는데도 이미지 크기 조절이 잘 안됨.
   - url을 이용하여 이미지를 불러올 때에는 아래와 같이..
     - 위와 같이 그냥 불러오면 이미지가 표시가 안되는데 그 이유는 online상의 image를 불러올 때에는 width, height를 설정을 해줘야 한다.
3. ugly한 위 title을 고쳐보자.
   - Navigator의 Screen component에 options를 줄 수 있다. headerTitleStyle에서 변경할 수 있음.
4. status bar를 바꿔보자.

- <StatusBar> react-native component를 이용하면 된다.
  - 강의에서는 barStyle이라 하였는데, source를 찾아 보니 style light, dark 등으로 있다.

5. Image Blur처리
   - expo 문서에서 찾아 보네.
   - expo-blur의 BlurView 컴퍼넌트임.
   - expo install 해줘야 하는 것.
   - intensity, tint 옵션 등이 있음. 자세한 건 문서 확인.

## 8.3 Button component 만들기

1. Auth folder에서 Button을 만듬.
   - 내용 별 무.
   - Dimensions가 갑자기 튀어나옴.
     - screen 정보를 얻을 수 있는 듯함.
     - Dimensions.get("screen"). width height 를 얻어냄.
2. 일관된 컬러를 위해 color.js를 만들어 주는게 좋다함.

## 8.4 Sign in part one

1. Log in screen은 복잡하면 안된다고 생각한다면서 pinterest.com가서 샘플 골라서 만들자 함.
2. TextInput
   ```js
   <Container>
     <TextInput
       value={username}
       autoCapitalize="none"
       placeholder="Username"
       onChangeText={(text) => setUsername(text)}
     ></TextInput>
     <TextInput
       value={password}
       placeholder="Password"
       onChangeText={(text) => setPassword(text)}
       secureTextEntry
     ></TextInput>
     <AuthButton text={"Sing In"} accent onPress={handleSubmit}></AuthButton>
   </Container>
   ```
   - input type=text와 유사.
   - value change 관련해서 react hook과 연결 시키는 것..
   - 사용 props, onChangeText
   - 적을 내용이 없다 그냥 코드를 보자.

## 8.5 Keyboard avoiding view

1. Keyboard avoiding view
   > > > It is a component to solve the common problem of views that need to move out of the way of the virtual keyboard. It can automatically adjust either its height, position, or bottom padding based on the keyboard height.

- 뭔 말인지 잘 이해는 안간다.
- 으으 설명을 들어도 잘 모르겠다.아무튼 virtual keyboard 때문임.

## 8.6 apiClient

```js
const callApi = async (method, path, data, jwt) => {
  const headers = {
    Authorization: jwt,
    "Content-Type": "application/json",
  };
};
```

이런 식으로 일종의 wrapper를 만든다.

## 8.7 create account

1. username을 email로 변경하였는데, input에서 keyboard appearance 바꾸는 파트가 있다.

- keyboardType = {"email-address"}

2. Email 검증
   - email regex 이용, google에서 검색해서 사용하자.
   - utils.js 파일을 또 만드네..
   ```js
   export const isEmail = (email) => {
     const regEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
     return regEx.test(email);
   };
   ```

- 정규식을 이렇게 사용해 볼 수 있구나.

3. axios return value에서 status 속성으로 결과를 알 수 있음.
4. 생성 후 로그인 화면으로 redirect
5. ActivityIndicator: loading 등에 사용하면 괜찮다.

```js
{
  loading ? (
    <ActivityIndicator color={accent ? "white" : "black"} />
  ) : (
    <Text accent={accent}>{text}</Text>
  );
}
```

6. TextInput에서 자꾸 strong password 관련해서 문제가 있었는데..
   - Input 옵션에 blurOnSubmit 하니 나오지 않는다. 이 옵션은 submit시 input을 blur시키는 것..
7. Navigator Screen component에는 navigation props이 딸려 온다.
   - Sign up 한 후 Sing in 으로 redirect하는 작업들을 할 수 있는 것.
   - information도 전달할 수 있다고 한다.
     - navigate(to, params)
     - console.log 해 보면, props.route.params에 들어가 있다.

## 8.10 Login part

1. currying

- 새로운 syntax, 함수를 반환해주는 역할

```js
export const userLogin = (form) => async (dispatch) => {};
function userLogin(forms) {
  return function (dispatch) {

  }
}
}
userLogin(form)(dispatch);
excutedWithForm(dispatch);
connect(map, map) (component)
```

- userLogin(form)을 호출하면 함수가 반환이 된다.
- 밑에 있는 거과 같은 역할을 하는 것. 밑에 같은 과정으로 호출된..

# 9. Explore

## 9.0 Main navigator

1. Screen 먼저 만들기

- Main folder
  - Explorer, Map, Profile, Saved 만들 예정.

2. Navigator 만들기

- react navigation/bottom tabs 이용
- 공식 문서 확인
- bottom tabs navigation styling
  - tabBarOptions
    - activeTintColor,
    - labelStyle, textTransform,
    - fontWeight,
    - tabStyle, padding
  - screenOptions
    - screenOptions는 오브젝트를 함수로 리턴해야 한다.
    - routes
    - tabBarIcon
  - icon name 규칙이 android는 앞에 md-로 시작하고, ios는 ios-로 시작한다.
  - 왜 유틸을 중간부터 바꾸는거야..
  - 코드와 문서를 확인하자. 일일히 적을 수가 없을 듯하다.

# 9.2 Room slice and clean up

1. roomsSlice

- 새로운 슬라이스 만드어서 action 및 data 구조 추가.

2. Container, Presenter 구조로 screen 다시 만들기. 나중에 정리 힘들어 지기 전에.

# 9.3

1. mapDispatchToProps(dispatch)
   - Container에서 dispatch 사용하는 것이 싫다면서... index.js에서 연결해줌.
2. mapStateToProps(state) 도 연결해줌
3. roomsSlice에서 getRooms만들어줌.
4. 코드를 이해를 못하게 만드는 중인데... setExplorerRooms에 매번 업데이트 때마다 방을 추가를 하는데,

- 그 방이 있는지 없는지 확인을 해서 추가를 한다?
- 그럼 state에 page는 왜 넣은거지...???? 아유 퍼킹 키딩미?
- scroll 문제 때문에 니코 코드로 가야할 것 같다.

# 9.5

1. react 다루면서 이런게 잘 이해가 안갔다.

```js
{
  rooms.length === 0 ? <ActivityIndicator color="black" /> : <Text>Hello</Text>;
}
```

- 그냥 외아 놓자.
- ActiviIndicator 넣음으로서 로딩화면 표시하는 방법도 알아 놓자.

2. RoomCard Component

- Data 넘겨주면서 proptype 만드는 부분 괜찮음.
- DRF에서 photo serializer를 만들지 않아서 없었던 것 같았는데, 갑자기 생겨서 만들어 놓음.
- \<ScrollView\> Component
  - Scroll 가능하게 해주는 View
  - contentContainerStyle
    - paddingHorizontal

# 9.7 Photo slider

1. Dimension으로 width, height 불러와서 component size를 정함.
2. 갑자기 ScrollView의 scroll indicator가 보기 싫다면서 없앰.
   - ScrollView showsVerticalScrollIndicator property.
3. Image resizeMode

- 나는 styled component에 resize-mode: cover; 라고 적었는데
- 니콜라스는 Image resizeMode="contain" 이런식으로 적음.

4. Image Swiper

- 여러 이미지를 swipe할 수 있는 컴퍼넌트인 듯..
- > > > npm i --save react-native-swiper
- > > > npm i --save react-native-swiper@nightly

```js
  <Swper autoplay pagenationStyle={{ }} activeDotColor={"white"} dotColor={"grey"}>
```

1. pillow

- 나는 잘되는데 webp를 jpg, jpeg로 변환해야 한다고 하면서... DRF로 가서 pillow를 이용하여 jpg로 변환한다.

2. NAS에 api 서버를 돌릴 수 있게 되었다. debug 모드로.

# 9.10 LoadMore

- 결국에는 니콜라스가 옳았다. 내가 어리석었음. page와 rooms 저장하는 방식에 대해.. 나는 페이지네이션이 있지 않을까 했는데.
- 여기에서 목적은 유사 infinite scroll이었다.

1. useState, redux dispatch 까지 이번 화 강의는 매우 의미 있음.
2. 현재 방식의 문제점은 새로운 room이 생길 때, 새로운 room이 과거 페이지에 있다면.. 또는 room이 수정되었다면?? 그런 것들이 반영이 안될 것임.

- redux persist 사용 목적에 부합한가?? 자주 refresh 되어야 하는 것들이 말이야.
- 현재 로드한 페이지는 한달 후에도 똑같을 것.
- redux를 page에 저장하면 안되지 않을까.. 하는 문제가 생김.
- explorer는 항상 새로워야 하기 때문.

## 9.12 Realm database

1. 핸드폰에 database가 있는 것처럼 느끼게 해줌.
2. ORM 방식의 sqlite와 비스무리 한 것이라고 생각하면 될듯.. redux store를 사용하고 싶지 않으면 사용 가능하다라는 의미인 것같다.
3. mongoDB like함.

## 9.13 React Native Web Swiper

1. 갑자기 Swiper 라이브러리를 변경.
   - Swiper from "react-native-web-swiper"
   - PrevComponent, NextComponent property가 있는데 이부분은 next나 prev를 swiper에 표시해주는 부분. 없애도 상관 없다. 그래도 강의에서는 없앰.

# 10. SAVED SCREEN

# 10.0 Getting Favourites

1. api 및 slice에 action 추가.
2. redux thunk?

- redux toolkit을 설치할 때 같이 설치 된다.
-

# 10.3

1. DRF에 Response시 context에 request를 넘겨주기..?

- 나는 안그런데, 니코 강의 보면 favorite의 photo가 full path가 안나오고 relative path만 나오던데,
- 이 부분 수정은 DRF에서 request context를 response에 넘겨주면 해결 됨.. 근데 왜?
- 나도 보아하니 넘겨줬었네... user 정보를 넘겨줘야 하기 때문에..

# 10 ending

- 제일 중요한 부분은 redux toolkit, component re-render.
- redux toolkit에서 state 수정이 되면, component re-render.
- 어려웠던 부분이 니콜라스 강의와는 달리 usersReducer에 favs를 놔뒀는데,
- roomsReducer에서 explorer 파트와 연결이 안되는 부분이다보니, explorer에서 re-render가 안 일어났던 것.
- 그래서 explorer에 fav수정 하는 함수를 추가해줬는데, 그 다음 문제는 SAVED screen에서 Explorer 스크린으로 올 때,
- favorite 수정한 부분이 반영 안되는 것.
- 그래서 그 부분은 검색해서 addListener를 사용해야 한다는 것을 알고, 추가해줬는ㄷ 아무것도 안 넣어 줬는데 작동이 되네..
- 심오하다.
- 그런데 이 부분에서 문제가 있는게.. 모든 컴퍼넌트를 다 리렌더한다.. 어떻게 수정을 해야할지..
-
