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
import Video from 'react-native-video';
function VideoShow({route}) {
  const navigation = useNavigation();
  const videoPlayer = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const {videoFilePath, captureVideo} = route.params;
  return (
    <View style={{flex: 1}}>
      <Text>GJ</Text>
      {videoFilePath ||
        (captureVideo && (
          <>
            {console.log('videoFilePath', videoFilePath)}
            <View style={styles.ImageStyleView}>
              <Video
                source={{
                  uri: videoFilePath || captureVideo,
                }}
                style={styles.video}
                controls={true}
                ref={ref => (videoPlayer.current = ref)}
                repeat={true}
                paused={!isPlaying}
                muted={isMuted}
                resizeMode={'cover'}
                // volume={true}
              />
              <Button
                style={{width: 10, height: 10}}
                onPress={() => setIsPlaying(p => !p)}
                title={isPlaying ? 'Stop' : 'Play'}
              />
              <Button
                onPress={() => setIsMuted(m => !m)}
                title={isMuted ? 'Unmute' : 'Mute'}
              />
            </View>
          </>
        ))}
    </View>
  );
}
export default VideoShow;

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
