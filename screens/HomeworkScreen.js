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
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';
import firebase from 'firebase';
import { ListItem, SearchBar } from 'react-native-elements';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class HomeworkScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      homeworkName: '',
      firstHomeworkName: '',
      nameOfClass: '',
      dueDate: '',
      firstDueDate: '',
      activeHomework: '',
      userDocId: '',
    };
  }

  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

  addHomework = async (homeworkName) => {
    var uniqueId = this.createUniqueId();
    var userId = this.state.userId;

    db.collection('homework').add({
      userId: userId,
      homeworkName: this.state.homeworkName,
      nameOfClass: this.state.nameOfClass,
      dueDate: this.state.dueDate,
      status: 'Pending',
      homeworkId: uniqueId,
    });

    db.collection('users')
      .where('email', '==', userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('users')
            .doc(doc.id)
            .update({
              activeHomework: this.state.activeHomework + 1,
            });
        });
      });

    this.setState({
      homeworkName: '',
      nameOfClass: '',
      dueDate: '',
    });

    return alert('Homework was added to list');
  };

  getAmountOfHomeworkActive = () => {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            activeHomework: doc.data().activeHomework,
            userDocId: doc.id,
          });
        });
      });
  };

  getHomework = () => {
    var homeworkRequest = db
      .collection('homework')
      .where('userId', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().status !== 'Finished') {
            this.setState({
              firstHomeworkName: doc.data().homeworkName,
              status: doc.data().status,
              firstDueDate: doc.data().dueDate,
              docId: doc.id,
            });
          }
        });
      });
  };

  finishedHomework = (homeworkName) => {
    var userId = this.state.userId;

    db.collection('finishedHomework').add({
      userId: userId,
      homeworkName: homeworkName,
      status: 'Finished',
    });
  };

  updateHomeworkStatus = () => {
    db.collection('homework').doc(this.state.docId).update({
      status: 'Finished',
    });
    var userId = this.state.userId;

    db.collection('users')
      .where('email', '==', userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('users')
            .doc(doc.id)
            .update({
              activeHomework: this.state.activeHomework - 1,
            });
        });
      });
  };

  componentDidMount() {
    this.getHomework();
    this.getAmountOfHomeworkActive();
  }

  render() {
    if (this.state.activeHomework > 7) {
      return (
        <View
          style={{
            backgroundColor: '#04004e',
            flex: 1,
            justifyContent: 'center',
          }}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                textDecorationLine: 'underline',
              }}>
              Homework Name
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                marginTop: 20,
              }}>
              {this.state.firstHomeworkName}
            </Text>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                textDecorationLine: 'underline',
                marginTop: 30,
              }}>
              Due Date
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                marginTop: 20,
              }}>
              {this.state.dueDate}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.updateHomeworkStatus();
                this.finishedHomework(this.state.firstHomeworkName);
              }}
              style={styles.recievedButton}>
              <Text style={styles.requestText}>I Finished This Homework </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        // Form screen
        <View style={{ flex: 1, backgroundColor: '#04004e' }}>
          <MyHeader title="Add Homework" navigation={this.props.navigation} />

          <View>
            <View style={{ alignItems: 'center', marginTop: 150 }}>
              <TextInput
                style={styles.textInputBox}
                placeholder={'Enter Name Of Homework'}
                onChangeText={(text) => this.setState({ homeworkName: text })}
                value={this.state.homeworkName}
              />

              <TextInput
                style={styles.textInputBox}
                placeholder={'When Is The Homework Due?'}
                onChangeText={(text) => {
                  this.setState({ dueDate: text });
                }}
                value={this.state.dueDate}
              />
              <TextInput
                style={styles.textInputBox}
                placeholder={'What Class Is This For?'}
                onChangeText={(text) => {
                  this.setState({ nameOfClass: text });
                }}
                value={this.state.nameOfClass}
              />
              <TouchableOpacity
                style={styles.requestButton}
                onPress={() => {
                  this.addHomework(this.state.homeworkName);
                }}>
                <Text style={styles.requestText}>Request</Text>
              </TouchableOpacity>
              <Image
                source={require('../assets/scroll.png')}
                style={{ width: 100, height: 100, marginTop: 50 }}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textInputBox: {
    width: '75%',
    height: 45,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderColor: 'black',
    color: '#04004e',
    fontSize: 15,
  },
  requestButton: {
    width: '50%',
    height: 40,
    marginTop: 60,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  requestText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#04004e',
  },
  recievedButton: {
    width: '70%',
    height: 50,
    marginTop: 30,
    marginLeft: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
});
