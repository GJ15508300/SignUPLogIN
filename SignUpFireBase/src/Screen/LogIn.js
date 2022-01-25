import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Input, Icon} from 'react-native-elements';
import {CheckLogin} from '../FireBase/CheckLogin';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {useNavigation} from '@react-navigation/native';
let CheckData = false;
function CheckLogINData() {
  console.log('CheckDAta', CheckData);
  CheckData = CheckLogin();
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required')
    .label('Email'),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
});

const ICON = {
  width: 15,
  height: 15,
  marginLeft: 7,
};
function LogIn() {
  const navigation = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [LogInCheck, setLogInCheck] = useState(false);
  return (
    <>
      <ImageBackground
        // blurRadius={1}
        // resizeMode={'stretch'} // or cover
        style={styles.backgroundImage}
        source={require('../img/grayMountain.jpg')}>
        <View style={styles.formStyle}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: 80, height: 80}}
              source={require('../img/heart.png')}
              borderRadius={100}
            />
          </View>

          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={SignupSchema}
            onSubmit={values => {
              console.log('submit values', values),
                CheckLogin(
                  values.email,
                  values.password,
                  // (setLogInCheck = {setLogInCheck}),
                ),
                navigation.navigate('LoggedIN');
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.ViewStyle}>
                <Text style={{fontWeight: 'bold', color: 'red', fontSize: 20}}>
                  User Name
                </Text>
                <Input
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCorrect={false}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                )}
                <Text style={{fontWeight: 'bold', color: 'red', fontSize: 20}}>
                  Password
                </Text>
                <Input
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={isSecureEntry}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => {
                        setIsSecureEntry(prev => !prev);
                      }}>
                      <Image
                        source={require('../img/pwdIcon.png')}
                        style={styles.btnImage}
                      />
                    </TouchableOpacity>
                  }
                />
                {errors.password && touched.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
                <View style={{alignSelf: 'center'}}>
                  <TouchableOpacity
                    style={{
                      height: 100,
                      width: 200,
                    }}>
                    <Button
                      onPress={handleSubmit}
                      title="Login"
                      color={'transparent'}
                    />
                  </TouchableOpacity>

                  <View style={{alignSelf: 'center'}}>
                    <Text>or Contact With</Text>
                  </View>
                  {/* <Button title="check" onPress={CheckLogin}></Button> */}
                  <LoginButton
                    onLoginFinished={(error, result) => {
                      if (error) {
                        console.log('login error:', result.error);
                      } else if (result.isCancelled) {
                        console.log('login cancel');
                      } else {
                        AccessToken.getCurrentAccessToken().then(data => {
                          console.log('tokent', data.accessToken.toString());
                        });
                      }
                    }}
                    onLogoutFinished={() => console.log('logout.')}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </>
  );
}
export default LogIn;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ViewStyle: {
    // flex: 1,
    // backgroundColor: 'rgba(192, 192, 192, .6)',
    padding: 20,
  },
  visibilityBtn: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5,
  },
  btnImage: {
    resizeMode: 'contain',
    height: '90%',
    // width: '-1%',
    // marginLeft: 140,
  },
  formStyle: {
    flex: 1,
    backgroundColor: 'rgba(192, 192, 192, .6)',
  },
});
