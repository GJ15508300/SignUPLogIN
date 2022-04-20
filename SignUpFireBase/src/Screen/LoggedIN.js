import {useNavigation} from '@react-navigation/native';
import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import sqlite from 'react-native-sqlite-storage';
import {Button} from 'react-native-elements';
sqlite.enablePromise(true);
const db = sqlite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);
function LoggedIN() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  useEffect(() => {
    getData;
  }, []);
  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var userName = results.rows.item(0).Name;
            var userAge = results.rows.item(0).Age;
            setName(userName);
            setAge(userAge);
          }
        });
      });
    } catch (er) {
      console.log(er);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Please write ur data.');
    } else {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE User SET name=?',
          [name],
          () => {
            Alert.alert('ur data has been updated.');
          },
          error => {
            console.log(error);
          },
        );
      });
    }
  };

  const removeData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          () => {
            navigation.navigate('Home');
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TextView}>LoggedIN</Text>

      <Text style={styles.TextView}>Welcome{name}</Text>
      <Button title={'Update'} onPress={updateData} color={'yellow'} />
      <Button title={'Remove'} onPress={removeData} color={'red'} />
    </View>
  );
}
export default LoggedIN;

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    backgroundColor: 'rgba(25,0,45,.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextView: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
