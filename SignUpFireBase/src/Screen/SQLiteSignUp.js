import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import sqlite from 'react-native-sqlite-storage';
import {Button} from 'react-native-elements';
// sqlite.enablePromise(true);
const db = new sqlite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

function SQLiteSignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  useEffect(() => {
    // createMYTable();
    // createTable();
    // getData();
    // getData;
  }, []);

  //   const createTable = () => {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         'CREATE TEBLE IF NOT EXISTS' +
  //           'Users ' +
  //           '(ID INTEGER PRIMARY KEY AUTOCREMENT,Name TEXT, Age INTEGER);',
  //       );
  //     });
  //   };
  const setMYTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          //   if (res.rows.length == 0) {
          //     txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
          //     txn.executeSql(
          //       'CREATE TABLE IF NOT EXISTS Student_Table(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name VARCHAR(30), student_phone INT(15), student_address VARCHAR(255))',
          //       [],
          //     );
          //   }
        },
      );
    });
    Alert.alert('SQLite Database and Table Successfully Created...');
  };
  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert('warning!', 'Please write your data');
    } else {
      try {
        await db.transaction(async tx => {
          // await tx.executeSql(
          //     "INSERT INTO Users (Name, Age) VALUES ('"  + name + "', " + age + ")"
          //     );
          await tx.executeSql('INSERT INTO Users (Name, Age) VALUES (?,?)', [
            name,
            age,
          ]);
        });
        navigation.navigate('LoggedIN');
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            navigation.navigate('Home');
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createMYTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Student_Table(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name VARCHAR(30), student_phone INT(15), student_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
    Alert.alert('SQLite Database and Table Successfully Created...');
  };

  return (
    <View style={styles.ViewStyle}>
      <ScrollView>
        <SafeAreaView style={{flex: 1}}>
          <View>
            <Text style={styles.titleText}>SQLite in React Native</Text>
            <TextInput
              style={styles.textFieldStyle}
              placeholder="Enter your name"
              onChange={value => setName(value)}
              placeholderTextColor="blue"
            />
            <TextInput
              style={styles.textFieldStyle}
              placeholder="Enter your age"
              onChange={value => setAge(value)}
              placeholderTextColor="blue"
            />
            <Button title={'Login'} color={'red'} onPress={() => setData()} />
            {/* <Button
              title={'Create Table'}
              color={'yellow'}
              onPress={() => createMYTable}
            /> */}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

export default SQLiteSignUp;

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
    backgroundColor: 'rgba(0,255,255,.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFieldStyle: {
    backgroundColor: 'white',
    color: 'red',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
