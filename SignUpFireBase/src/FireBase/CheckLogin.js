import database from '@react-native-firebase/database';
export const CheckLogin = async (email, password) => {
  let MYreadDB;
  let Refrencekey = [];
  let pwd = [];
  MYreadDB = await database()
    .ref('/user')
    .once('value', function (snapshot) {
      snapshot.forEach(function (childSnapShot) {
        Refrencekey.push(childSnapShot.key);
        pwd.push(snapshot.val());
      });
    });
  console.log('MY', pwd);
  console.log('ref', MYreadDB);
};
