import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

function LoggedIN() {
  const navigation = useNavigation();
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TextView}>LoggedIN</Text>
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
