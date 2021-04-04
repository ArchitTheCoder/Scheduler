import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Card, Header, Icon, ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

export default class SchoolScheduleDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      day: this.props.navigation.getParam('dayOfWeek'),
      mondaySchedule: [],
      tuesdaySchedule: [],
      wednesdaySchedule: [],
      thursdaySchedule: [],
      fridaySchedule: [],
      isModalVisible: false,
      timing: '',
    };
    this.requestRef = null;
  }

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
              <Text style={styles.modalTitle}>Add To Schedule</Text>

              <TextInput
                style={styles.timingBox}
                placeholder="Timing"
                maxLength={25}
                onChangeText={(text) => {
                  this.setState({ timing: text });
                }}
              />

              <TouchableOpacity
                style={styles.addToSBtn}
                onPress={() => {
                  this.addToSchedule();
                }}>
                <Text style={styles.addToSText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ isModalVisible: false })}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  addToSchedule = () => {
    if (this.state.day === 'Monday') {
      this.state.mondaySchedule.push(this.state.timing);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Monday: this.state.mondaySchedule,
            });
          });
        });
    } else if (this.state.day === 'Tuesday') {
      this.state.tuesdaySchedule.push(this.state.timing);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Tuesday: this.state.tuesdaySchedule,
            });
          });
        });
    } else if (this.state.day === 'Wednesday') {
      this.state.wednesdaySchedule.push(this.state.timing);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Wednesday: this.state.wednesdaySchedule,
            });
          });
        });
    } else if (this.state.day === 'Thursday') {
      this.state.thursdaySchedule.push(this.state.timing);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Thursday: this.state.thursdaySchedule,
            });
          });
        });
    } else if (this.state.day === 'Friday') {
      this.state.fridaySchedule.push(this.state.timing);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Friday: this.state.fridaySchedule,
            });
          });
        });
    }
  };

  getRequest = () => {
    this.requestRef = db
      .collection('daysOfWeek')
      .where('userId', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = snapshot.docs.map((doc) => doc.data());
          this.setState({
            mondaySchedule: data[0]['Monday'],
            tuesdaySchedule: data[0]['Tuesday'],
            wednesdaySchedule: data[0]['Wednesday'],
            thursdaySchedule: data[0]['Thursday'],
            fridaySchedule: data[0]['Friday'],
          });
        });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={'Period ' + (index + 1)}
        subtitle={item}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              this.removeFromSchedule(index);
              this.props.navigation.goBack()
            }}>
            <Text style={styles.deleteText}>Remove</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  removeFromSchedule = (index) => {
    if (this.state.day === 'Monday') {
      this.state.mondaySchedule.splice(index, 1);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Monday: this.state.mondaySchedule,
            });
          });
        });

      this.setState({ mondaySchedule: this.state.mondaySchedule });
    } else if (this.state.day === 'Tuesday') {
      this.state.tuesdaySchedule.splice(index, 1);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Tuesday: this.state.tuesdaySchedule,
            });
          });
        });

      this.setState({ tuesdaySchedule: this.state.tuesdaySchedule });
    } else if (this.state.day === 'Wednesday') {
      this.state.wednesdaySchedule.splice(index, 1);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Wednesday: this.state.wednesdaySchedule,
            });
          });
        });

      this.setState({ wednesdaySchedule: this.state.wednesdaySchedule });
    } else if (this.state.day === 'Thursday') {
      this.state.thursdaySchedule.splice(index, 1);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Thursday: this.state.thursdaySchedule,
            });
          });
        });

      this.setState({ thursdaySchedule: this.state.thursdaySchedule });
    } else if (this.state.day === 'Friday') {
      this.state.fridaySchedule.splice(index, 1);
      db.collection('daysOfWeek')
        .where('userId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('daysOfWeek').doc(doc.id).update({
              Friday: this.state.fridaySchedule,
            });
          });
        });

      this.setState({ fridaySchedule: this.state.fridaySchedule });
    }
  };

  componentDidMount() {
    this.getRequest();
  }

  componentWillUnmount() {
    this.requestRef;
  }

  render() {
    if (this.state.day === 'Monday') {
      return (
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {this.showModal()}
          </View>
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
                text: `Monday`,
                style: {
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  backgroundColor: '#04004e',
                },
              }}
              backgroundColor="#04004e"
            />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.mondaySchedule}
              renderItem={this.renderItem}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}>
              <Text style={styles.addText}> Add Class </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (this.state.day === 'Tuesday') {
      return (
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {this.showModal()}
          </View>
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
                text: `Tuesday`,
                style: {
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  backgroundColor: '#04004e',
                },
              }}
              backgroundColor="#04004e"
            />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.tuesdaySchedule}
              renderItem={this.renderItem}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}>
              <Text style={styles.addText}> Add Class </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (this.state.day === 'Wednesday') {
      return (
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {this.showModal()}
          </View>
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
                text: `Wednesday`,
                style: {
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  backgroundColor: '#04004e',
                },
              }}
              backgroundColor="#04004e"
            />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.wednesdaySchedule}
              renderItem={this.renderItem}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}>
              <Text style={styles.addText}> Add Class </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (this.state.day === 'Thursday') {
      return (
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {this.showModal()}
          </View>
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
                text: `Thursday`,
                style: {
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  backgroundColor: '#04004e',
                },
              }}
              backgroundColor="#04004e"
            />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.thursdaySchedule}
              renderItem={this.renderItem}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}>
              <Text style={styles.addText}> Add Class </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (this.state.day === 'Friday') {
      return (
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {this.showModal()}
          </View>
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
                text: `Friday`,
                style: {
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  backgroundColor: '#04004e',
                },
              }}
              backgroundColor="#04004e"
            />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.fridaySchedule}
              renderItem={this.renderItem}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}>
              <Text style={styles.addText}> Add Class </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#04004e',
    width: 170,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 85,
    borderRadius: 5,
  },
  addText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  timingBox: {
    width: 200,
    height: 50,
    borderColor: 'white',
    borderBottomWidth: 1.5,
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    marginTop: 60,
    backgroundColor: '#04004e',
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
    color: 'white',
  },
  addToSText: {
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
  addToSBtn: {
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
  deleteBtn: {
    alignItems: 'center',
    marginTop: 0,
    marginLeft: 105,
    height: 40,
    width: 80,
    backgroundColor: '#04004e',
    borderRadius: 10,
  },
  deleteText: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
