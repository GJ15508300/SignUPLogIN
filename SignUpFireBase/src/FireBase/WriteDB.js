import database from '@react-native-firebase/database';
function WriteDB() {
  database()
    .ref('/users/123')
    .set({
      name: 'Ada Lovelace',
      age: 31,
    })
    .then(() => console.log('Data set.'));
}
export default WriteDB;
