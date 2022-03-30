import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
// import Video from 'react-native-video';

function ImagePicker({route}) {
  const navigation = useNavigation();
  const [imageFilePath, setImageFilePath] = useState();
  const [videoFilePath, setVideoFilePath] = useState();
  const [photo, setPhotoURI] = useState(null);
  const {width, height} = Dimensions.get('window');
  const [up_load, setUPLoad] = useState(false);
  const {source, profilePhoto} = route?.params ?? {};
  const [tp_load, setTPLoad] = useState(false);
  const [captureImageS, setCaptureImage] = useState(null);
  const [captureVideo, setCaptureVideo] = useState(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  const togglePlaying = () => {};

  const videoPlayer = React.useRef();

  const goFullScreen = () => {
    if (videoPlayer.current) {
      videoPlayer.current.presentFullscreenPlayer();
    }
  };

  console.log('captureImageS', captureImageS);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      //   maxWidth: 300,
      //   maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);
        setPhotoURI(response.uri);
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        if (type === 'photo') {
          setImageFilePath(response);
        }
        if (type === 'video') {
          setVideoFilePath(response);
        }
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response.assets[0].uri);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      if (type === 'photo') {
        setImageFilePath(response.assets[0].uri);
      } else if (type === 'video') {
        setVideoFilePath(response.assets[0].uri);
      }
      console.log('filePath', imageFilePath);
    });
  };
  const handleTakePic = type => {
    setTPLoad(true);
    const optoins = {
      mediaType: type,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let array = captureImage?.length > 0 ? captureImage : [];
    array = Object.assign([], array);
    launchCamera(optoins, res => {
      console.log('handleTakePic respos', res);
      if (res.didCancel) {
        setTPLoad(false);
        console.log('User cancelled image picker');
      } else if (res.error) {
        setTPLoad(false);
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        setTPLoad(false);
        console.log('User tapped custom button: ', res.customButton);
      } else {
        res?.assets.map((item, index) => {
          array.push(item);
        });
        if (type === 'photo') {
          setCaptureImage(res.assets[0].uri);
        }
        if (type === 'video') {
          setCaptureVideo(res.assets[0].uri);
        }
        setTPLoad(false);
      }
    });
  };
  const handleUploadPhoto = type => {
    setUPLoad(true);
    const options = {
      mediaType: type,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      selectionLimit: profilePhoto ? 1 : 0,
    };
    let array = captureImage?.length > 0 ? captureImage : [];
    array = Object.assign([], array);
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        setUPLoad(false);
        console.log('User cancelled image picker');
      } else if (res.error) {
        setUPLoad(false);
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        setUPLoad(false);
        console.log('User tapped custom button: ', res.customButton);
      } else {
        res?.assets.map((item, index) => {
          array.push(item);
        });
        if (type === 'photo') {
          setCaptureImage(res.assets[0].uri);
        }
        if (type === 'video') {
          setCaptureVideo(res.assets[0].uri);
        }
        // setCaptureImage(array);
        setUPLoad(false);
      }
    });
  };

  return (
    <View style={styles.ViewStyle}>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <Text style={styles.titleText}>Image Picker in React Native</Text>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          {imageFilePath ||
            (captureImageS && (
              <>
                {console.log('photo', imageFilePath)}
                <View style={styles.ImageStyleView}>
                  <Image
                    source={{uri: imageFilePath || captureImageS}}
                    style={styles.imageStyle}
                    borderRadius={100}
                  />
                </View>
              </>
            ))}
          {videoFilePath ||
            (captureVideo && (
              <>
                {console.log('videoFilePath', videoFilePath)}
                <View style={styles.ImageStyleView}>
                  <Video
                    source={{
                      uri: videoFilePath || captureVideo,
                    }}
                    style={{width: 200, height: 300}}
                    controls={true}
                    // onBuffer={this.videoBuffer}
                    ref={ref => (videoPlayer.current = ref)}
                    // paused={false}
                    repeat={true}
                    paused={!isPlaying}
                    muted={isMuted}
                  />
                  {/* <Button
                    // style={{width: 10, height: 10}}
                    onPress={() => setIsPlaying(p => !p)}
                    title={isPlaying ? 'Stop' : 'Play'}
                  />
                  <Button
                    onPress={() => setIsMuted(m => !m)}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  /> */}
                </View>
              </>
            ))}
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          // onPress={() => captureImage('photo')}>
          onPress={() => {
            handleTakePic('photo');
          }}>
          <Text style={styles.textStyle}>Launch Camera for Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          // onPress={() => captureImage('video')}>
          onPress={() => {
            handleTakePic('video');
          }}>
          <Text style={styles.textStyle}>Launch Camera for Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          // onPress={() => chooseFile('photo')}>
          onPress={() => {
            handleUploadPhoto('photo');
          }}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          // onPress={() => chooseFile('video')}>
          onPress={() => {
            handleUploadPhoto('video');
          }}>
          <Text style={styles.textStyle}>Choose Video</Text>
        </TouchableOpacity>

        <Text style={styles.textStyle}>
          {imageFilePath}
          {videoFilePath}
          {captureImageS}
          {captureVideo}
        </Text>
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
}

export default ImagePicker;

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
    backgroundColor: 'rgba(25,0,45,.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  ImageStyleView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
