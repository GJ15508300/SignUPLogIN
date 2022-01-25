import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
export const CheckLogin = async (email, password) => {
  // const navigation = useNavigation();
  let MYreadDB;
  // console.log('enter');
  let Refrencekey = [];
  let LoginCheck = false;
  // let LogINREturnDAte = false;
  MYreadDB = await database()
    .ref('/user')
    .once('value', function (snapshot) {
      // console.log('snap val', snapshot.val());
      snapshot.forEach(function (childSnapShot) {
        Refrencekey.push(childSnapShot.val());
      });
    });
  for (let i = 0; i < Refrencekey.length; i++) {
    if (Refrencekey[i].Email === email) {
      LoginCheck = true;
      if (Refrencekey[i].Password === password) {
        console.log('Log in successfull');
        // LogINREturnDAte = true;
        // navigation.navigate('SignUPScreen');
        break;
      } else {
        console.log('LOG in Err Password incorrect');
      }
    }
  }
  if (!LoginCheck) {
    console.log('Incorrect Email Id');
  }
  // console.log('ref', LogINREturnDAte);
  // return LogINREturnDAte;
};
