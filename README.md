# react-native-eshop
Build React Native (NO Expo) e-shop based on Udemy course from Maximilian Schwarzmüller.

> **STACK**
> - Firebase
> - React Native Elements
> - React Navigation
> - React Redux
> - Redux Thunk
> - Async Storage
> - Formik
> - Yup
> - React Native Vector Icons

> **Features**
> - Hooks
> - Dynamic responsive calculation
> - Register, Login
> - User token
> - AutoLogin, AutoLogout (calculate expire token)

## Demo
![Welcome](/assets/screenshots/Welcome.png)
![CreateAccount](/assets/screenshots/CreateAccount.png)
![Menu](/assets/screenshots/Menu.png)
![Products](/assets/screenshots/Products.png)
![Cart](/assets/screenshots/Cart.png)
![OrderDetail](/assets/screenshots/OrderDetail.png)

## Instalation
*	**Clone and install packages**
```
git clone https://github.com/zakve/react-native-eshop.git
cd react-native-eshop
npm i
npx react-native run-ios
npx react-native run-android
```

### Firebase Database
If you want to use Firebase, you have to add `API_KEY` constant into `.env` file which is secret and for that reason is in `.gitignore`.
