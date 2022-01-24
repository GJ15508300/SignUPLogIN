import database from '@react-native-firebase/database';

export const AddNewDataBase = (FirstName, LastName, Email, Password) => {
  console.log(
    'AddNewDataBase FirstName, LastName, Email, Password',
    FirstName,
    LastName,
    Email,
    Password,
  );
  const newReference = database().ref('/user').push();
  console.log('Auto generated key: ', newReference.key);

  newReference
    .set({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password: Password,
    })
    .then(() => console.log('NEW Data Added.'));
};
