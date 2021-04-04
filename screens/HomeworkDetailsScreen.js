import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Card, Header, Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

export default class HomeworkDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: '',
      activeHomework: '',
      dueDate: this.props.navigation.getParam('details')['dueDate'],
      homeworkName: this.props.navigation.getParam('details')['homeworkName'],
      nameOfClass: this.props.navigation.getParam('details')['nameOfClass'],
      homeworkId: this.props.navigation.getParam('details')['homeworkId'],
      status: this.props.navigation.getParam('details')['status'],
    };
  }

  getUserDetails = (userId) => {
    db.collection('users')
      .where('email', '==', userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().first_name + ' ' + doc.data().last_name,
          });
        });
      });
  };

  getAmountOfHomeworkActive = () => {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            activeHomework: doc.data().activeHomework,
          });
        });
      });
  };

  updateHomeworkStatus = () => {
    db.collection('finishedHomework').add({
      homeworkName: this.state.homeworkName,
      status: 'Finished',
      userId: this.state.userId,
    });

    db.collection('homework')
      .where('homeworkId', '==', this.state.homeworkId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('homework').doc(doc.id).update({
            status: 'Finished',
          });
        });
      });

    db.collection('users')
      .where('email', '==', this.state.userId)
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
    this.getUserDetails(this.state.userId);
    this.getAmountOfHomeworkActive();
  }

  render() {
    return (
      <View>
        <View>
          <Header
            leftComponent={
              <AntDesign
                name="arrowleft"
                size={24}
                color="white"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: 'Pending Homework',
              style: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                backgroundColor: '#04004e',
              },
            }}
            backgroundColor="#04004e"
          />

          <View>
            <Card title={'Homework Information'} titleStyle={{ fontSize: 20 }}>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Name: {this.state.homeworkName}
                </Text>
              </Card>

              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Class: {this.state.nameOfClass}
                </Text>
              </Card>

              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Due Date: {this.state.dueDate}
                </Text>
              </Card>
            </Card>
          </View>
        </View>
        {this.state.status !== 'Pending' ? (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateHomeworkStatus();
                this.props.navigation.navigate('Finished_Homework');
              }}>
              <Text style={styles.buttonText}>I Finished This Assignment</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#04004e',
    width: 220,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
