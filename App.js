import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SingUpForm';
import SignInForm from './components/SignInForm';

export default class App extends React.Component {

  componentDidMount(){
    var config = {
      apiKey: "AIzaSyAi0uYBIiR1zGK4fE0frynj1gP0KUMhHSU",
      authDomain: "pruebasu-aa372.firebaseapp.com",
      databaseURL: "https://pruebasu-aa372.firebaseio.com",
      projectId: "pruebasu-aa372",
      storageBucket: "pruebasu-aa372.appspot.com",
      messagingSenderId: "824426460376"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
