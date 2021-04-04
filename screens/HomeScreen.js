import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      activeHomeworkList: [],
    };
    this.requestRef = null;
  }

  getRequest = () => {
    this.requestRef = db
      .collection('homework')
      .where('status', '==', 'Pending')
      .where('userId', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var activeHomeworkList = snapshot.docs.map((document) =>
          document.data()
        );
        this.setState({
          activeHomeworkList: activeHomeworkList,
        });
      });
  };

  componentDidMount() {
    this.getRequest();
  }

  componentWillUnmount() {
    this.requestRef;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.homeworkName}
        subtitle={item.nameOfClass}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('HomeworkDetails', {
                details: item,
              });
            }}>
            <Text style={{ color: '#ffff' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Pending Homework" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.activeHomeworkList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  marginTop: 350,
                  fontWeight: 'bold',
                }}>
                You Have No Pending Homework!
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.activeHomeworkList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#04004e',
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
