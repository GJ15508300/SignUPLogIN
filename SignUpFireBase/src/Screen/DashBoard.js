import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

function DashBoard() {
  const navigation = useNavigation();
  return (
    <View style={styles.ViewStyle}>
      <ScrollView>
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <Text style={styles.titleText}>
            FireBase Login, SQLite SignUp, and Image Picker in React Native
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={styles.textStyle}>LogIn sugnUp firebase</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('SQLiteSignUp');
            }}>
            <Text style={styles.textStyle}>LogIn sugnUp SQLite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('ImagePicker');
            }}>
            <Text style={styles.textStyle}>Image Picker</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 100,
    height: 100,
    margin: 5,
  },
  ViewStyle: {
    flex: 1,
    backgroundColor: 'rgba(85,107,47,8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
