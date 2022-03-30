import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
function LogInSignUpOption() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        // blurRadius={10}
        resizeMode={'stretch'}
        style={styles.backgroundImage}
        source={require('../img/redMountain.jpg')}>
        <View style={styles.ViewStyle}>
          <View
            style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
            <Image
              style={{width: 80, height: 80}}
              source={require('../img/heart.png')}
              borderRadius={100}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>HeartLink</Text>
          </View>
          <View style={{paddingBottom: 100, alignSelf: 'center'}}>
            <View>
              <TouchableOpacity
                style={{
                  height: 100,
                  width: 200,
                }}>
                <Button
                  title="SignUP"
                  color={'transparent'}
                  onPress={() => {
                    console.log('Entery');
                    navigation.navigate('SignUPScreen');
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Button
                title="LogIn"
                color={'transparent'}
                borderRadius="50"
                onPress={() => {
                  console.log('Entery');
                  navigation.navigate('LogInScreen');
                }}
              />
            </View>
            <View>
              <Button
                title="Image Picker"
                color={'transparent'}
                borderRadius="50"
                onPress={() => {
                  navigation.navigate('ImagePicker');
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default LogInSignUpOption;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ViewStyle: {
    flex: 1,
    backgroundColor: 'rgba(255,0,0,.8)',
  },
  ButtonStyle: {
    color: 'yellow',
  },
});
