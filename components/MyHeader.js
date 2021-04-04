import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header, Badge } from 'react-native-elements';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import db from '../config';
import firebase from 'firebase';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  getNumberOfUnreadNotifications = () => {
    db.collection('allNotifications')
      .where('notificationStatus', '==', 'Unread')
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => doc.data());
        this.setState({ value: unreadNotifications.length });
      });
  };

  componentDidMount() {
    this.getNumberOfUnreadNotifications();
  }

  render() {
    return (
      <Header
        leftComponent={
          <AntDesign
            name="bars"
            size={24}
            color="white"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            backgroundColor: '#04004e',
          },
        }}
        backgroundColor="#04004e"></Header>
    );
  }
}
