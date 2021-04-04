import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import db from '../config';
import { AntDesign } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export default class CustomSideBarMenu extends Component {
  constructor() {
    super();
    this.state = {
      image: '#',
      userId: firebase.auth().currentUser.email,
      docId: '',
      name: '',
    };
  }

  selectPicure = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = async (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((e) => {
        this.setState({ image: '#' });
      });
  };

  getUserProfile = () => {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + ' ' + doc.data().last_name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  };

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#04004e' }}>
        <Avatar
          rounded={true}
          source={{ uri: this.state.image }}
          size={'medium'}
          onPress={() => {
            this.selectPicure();
          }}
          containerStyle={styles.imageContainer}
          showEditButton={true}
        />
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} activeTintColor='white' inactiveTintColor='white' />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              this.props.navigation.navigate('WelcomeScreen');
              firebase.auth().signOut();
            }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <AntDesign
                name="logout"
                size={24}
                color="black"
                style={{ paddingLeft: RFValue(5), marginTop: 5, }}
              />
              <Text
                style={{
                  fontSize: RFValue(15),
                  fontWeight: 'bold',
                  marginTop: 4,
                  marginLeft: RFValue(10),
                }}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerItemsContainer: {
    flex: 1,
    backgroundColor: '#04004e',
  },
  logOutButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: 175,
    borderWidth: 1.5,
    borderColor: 'white',
    height: 40,
    marginTop: 275,
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageContainer: {
    width: 160,
    height: 160,
    marginLeft: 50,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    backgroundColor: '#04004e',
  },
});
