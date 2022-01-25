import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as React from 'react';
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
import * as Yup from 'yup';
import {AddNewDataBase} from '../FireBase/AddNewDataBase';
import WriteDB from '../FireBase/WriteDB';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
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
  confirmPassword: Yup.string().when('password', {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref('password')], 'Both Password need same'),
  }),
});
function FSignUp() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        // blurRadius={1}
        // resizeMode={'stretch'} // or cover
        style={styles.backgroundImage}
        source={require('../img/grayMountain.jpg')}>
        <View style={styles.ViewStyle}>
          <Text style={styles.FontStyle}>CreateAccount</Text>
          <Text>Sign up to get started</Text>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={
              values => {
                console.log('submit values', values),
                  AddNewDataBase(
                    values.firstName,
                    values.lastName,
                    values.email,
                    values.password,
                  ),
                  navigation.navigate('LogInScreen');
              }
              // ;() => {
              //   console.log('Entery');
              //   navigation.navigate('SignUPScreen');
              // }
            }>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <Text style={styles.NameStyle}>firstName</Text>
                <TextInput
                  placeholder="firstName"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  autoCorrect={false}
                  errorMessage={touched.firstName && errors.firstName}
                />
                {errors.firstName && touched.firstName && (
                  <Text style={{color: 'red'}}>{errors.firstName}</Text>
                )}
                {/* <Text style={{color: 'red'}}>{errors.firstName}</Text> */}
                <Text style={styles.NameStyle}>Last Name</Text>
                <TextInput
                  placeholder="lastName"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  autoCorrect={false}
                />
                {errors.lastName && touched.lastName && (
                  <Text style={{color: 'red'}}>{errors.lastName}</Text>
                )}
                {/* <Text style={{color: 'red'}}>{errors.lastName}</Text> */}
                <Text style={styles.NameStyle}>Email</Text>
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                )}
                {/* <Text style={{color: 'red'}}>{errors.email}</Text> */}
                <Text style={styles.NameStyle}>Password</Text>
                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  autoCapitalize="none"
                  secureTextEntry
                  textContentType="password"
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
                {/* <Text style={{color: 'red'}}>{errors.password}</Text> */}
                <Text style={styles.NameStyle}>confirm Password</Text>
                <TextInput
                  placeholder="confirmPassword"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  autoCapitalize="none"
                  // secureTextEntry
                  // textContentType="confirmPassword"
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={{color: 'red'}}>{errors.confirmPassword}</Text>
                )}
                {/* <Text style={{color: 'red'}}>{errors.password}</Text> */}

                <Button onPress={handleSubmit} title="Submit" />
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </View>
  );
}
export default FSignUp;

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    // backgroundColor: 'gray',
    padding: 40,
  },
  FontStyle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  NameStyle: {
    paddingTop: 1,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
