import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class MyFinishedHomework extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      finishedBookList: [],
    };
    this.requestRef = null;
  }

  getList = () => {
    this.requestRef = db
      .collection('finishedHomework')
      .where('userId', '==', this.state.userId)
      .where('status', '==', 'Finished')
      .onSnapshot((snapshot) => {
        var finishedBookList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          finishedBookList: finishedBookList,
        });
      });
  };

  componentDidMount() {
    this.getList();
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
        subtitle={item.status}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader
          title="Finished Homework"
          navigation={this.props.navigation}
        />
        <View style={{ flex: 1 }}>
          {this.state.finishedBookList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 350,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                You Have Not Assigned/Completed Any Homework Yet
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.finishedBookList}
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
});
