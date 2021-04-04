import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { AntDesign } from '@expo/vector-icons';

export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
      schoolName: '',
      confirmPassword: '',
      isModalVisible: false,
    };
  }

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch((err) => {
        var error = err.code;
        var errorMessage = error.messsage;
        return alert('Incorrect Email or Password');
      });
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>

              <TextInput
                style={styles.loginBox}
                placeholder="First Name"
                maxLength={25}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
              />

              <TextInput
                style={styles.loginBox}
                placeholder="Last Name"
                maxLength={25}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
              />

              <TextInput
                style={styles.loginBox}
                placeholder="School Name"
                maxLength={25}
                onChangeText={(text) => {
                  this.setState({ schoolName: text });
                }}
              />

              <TextInput
                style={styles.loginBox}
                placeholder="Email"
                maxLength={35}
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
              />

              <TextInput
                style={styles.loginBox}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />

              <TextInput
                style={styles.loginBox}
                secureTextEntry={true}
                placeholder="Confirm Password"
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              />

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text style={styles.registerText}> Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ isModalVisible: false })}>
                <Text style={styles.cancelText}> Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    } else {
      firebase.auth().createUserWithEmailAndPassword(emailId, password);

      db.collection('users').add({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.emailId,
        schoolName: this.state.schoolName,
      });

      db.collection('daysOfWeek').add({
        Monday: [],
        Tuesday: [],
        Wednesdaay: [],
        userId: this.state.emailId
      })

      return alert('Signed up successfully', '', [
        {
          text: 'OK',
          onPress: () => {
            this.setState({ isModalVisible: false });
          },
        },
      ]);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.showModal()}
        </View>

        <View>
          <Text style={styles.title}>XYZ</Text>
        </View>
        <View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <AntDesign
              name="login"
              size={24}
              color="white"
              style={{ flexDirection: 'row', marginTop: 35, marginLeft: -10 }}
            />
            <TextInput
              style={styles.loginBox2}
              underlineColorAndroid="transparent"
              placeholder="abc@example.com"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({ emailId: text });
              }}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <AntDesign
              name="lock"
              size={24}
              color="white"
              style={{ flexDirection: 'row', marginTop: 35, marginLeft: -10 }}
            />
            <TextInput
              style={styles.loginBox2}
              placeholder="Enter Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={() => {
                  this.userLogin(this.state.emailId, this.state.password);
                }}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04004e',
  },
  title: {
    fontSize: 50,
    color: 'white',
  },
  loginBox: {
    width: 200,
    height: 50,
    borderColor: 'white',
    borderBottomWidth: 1.5,
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
  loginBox2: {
    width: 200,
    height: 50,
    borderColor: 'white',
    borderBottomWidth: 1.5,
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  button: {
    marginLeft: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 80,
    height: 40,
    backgroundColor: 'white',
  },
  buttonText: {
    marginTop: 5,
    fontSize: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    marginTop: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 40,
    color: '#04004e',
  },
  registerText: {
    marginLeft: -10,
    marginTop: 5,
    fontSize: 20,
    textAlign: 'center',
    color: 'green',
  },
  cancelText: {
    marginLeft: -10,
    marginTop: 5,
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
  },
  cancelButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 150,
    height: 40,
    backgroundColor: 'white',
  },
  registerButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 150,
    height: 40,
    backgroundColor: 'white',
  },
});
