import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import firebase from 'firebase';
import { ListItem, Header, Card } from 'react-native-elements';
import db from '../config';
import { AntDesign } from '@expo/vector-icons';
import MyHeader from '../components/MyHeader';

export default class SchoolSchedule extends React.Component {
  //TODO: Add days of week when user signs up: ✅
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <MyHeader
            title="School Schedule"
            navigation={this.props.navigation}
          />

          <View style={{ flex: 1 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Monday</Text>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => {
                  this.props.navigation.navigate('SchoolScheduleDetails', {
                    dayOfWeek: 'Monday',
                  });
                }}>
                <Text style={styles.viewText}>View </Text>
              </TouchableOpacity>
            </Card>
          </View>

          <View style={{ flex: 1 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Tuesday</Text>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => {
                  this.props.navigation.navigate('SchoolScheduleDetails', {
                    dayOfWeek: 'Tuesday',
                  });
                }}>
                <Text style={styles.viewText}>View </Text>
              </TouchableOpacity>
            </Card>
          </View>

          <View style={{ flex: 1 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Wednesday</Text>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => {
                  this.props.navigation.navigate('SchoolScheduleDetails', {
                    dayOfWeek: 'Wednesday',
                  });
                }}>
                <Text style={styles.viewText}>View </Text>
              </TouchableOpacity>
            </Card>
          </View>

          <View style={{ flex: 1 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Thursday</Text>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => {
                  this.props.navigation.navigate('SchoolScheduleDetails', {
                    dayOfWeek: 'Thursday',
                  });
                }}>
                <Text style={styles.viewText}>View </Text>
              </TouchableOpacity>
            </Card>
          </View>

          <View style={{ flex: 1 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Friday</Text>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => {
                  this.props.navigation.navigate('SchoolScheduleDetails', {
                    dayOfWeek: 'Friday',
                  });
                }}>
                <Text style={styles.viewText}>View</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBtn: {
    alignItems: 'center',
    marginTop: -20,
    marginLeft: 215,
    height: 40,
    width: 60,
    backgroundColor: '#04004e',
    borderRadius: 10,
  },
  viewText: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
