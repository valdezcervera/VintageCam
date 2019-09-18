import React from 'react';
import { View, Text, TouchableOpacity, Image, CameraRoll } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
// import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions';
import styles from './styles';
import {
  Ionicons,
  MaterialIcons,
  Feather,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const flashIcons = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
  torch: 'highlight'
};


class CameraPage extends React.Component {
  camera = null;

  state = {
    hasCameraPermission: null,
    type: 'back',
    ratio: '1:1',
    ratios: [], //SHOULD I???
    newPhotos: false, //SHOULD I???
    // OPTIONS MENU 
    OptionsMenu: false,
    flashMode: 'off',
    zoom: 0,
    autoFocus: 'on',
    whiteBalance: 'auto',
    pictureSize: undefined,
    pictureSizes: [],
    pictureSizeId: 0,
    showGallery: false,
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const hasCameraPermission = (camera.status === 'granted' && cameraRoll.status === 'granted');
    this.setState({ hasCameraPermission });

    // FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'Moment').catch(e => {
    //   console.log(e, 'Directory exists'); 
    // });
  };
  
  toggleFlash = () => this.setState({ flashMode: flashModeOrder[this.state.flashMode] });

  //ZOOM CONTROLS
  zoomIn = () => this.setState({ zoom: this.state.zoom + 0.05 > 1 ? 1 : this.state.zoom + 0.05 });
  zoomOut = () => this.setState({ zoom: this.state.zoom - 0.05 < 0 ? 0 : this.state.zoom - 0.05 });

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.saveToRoll });
    }
  };

  handleMountError = ({ message }) => console.error(message);

  // Maybe create a separate folder for the app??
  // onPictureSaved = async photo => {
  //     await FileSystem.moveAsync({
  //         from: photo.uri,
  //         to: `${FileSystem.documentDirectory}VintagePhotos/${Date.now()}.jpg`,
  //     });
  //     this.setState({ newPhotos: true });
  // }
  saveToRoll = (photo) => CameraRoll.saveToCameraRoll(photo.uri)
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }


    return (
      // Main Container View
      <View style={styles.background}>
        <Image source={require('../assets/VintageCamSkin2.jpg')} style={styles.background}/>
        {/* zoom buttons */}
        <View style={styles.topBarControls}>
          <TouchableOpacity
            onPress={ this.zoomOut } 
            style={styles.zoom_Out}
          >
            <Feather name='zoom-out' size={40} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ this.zoomIn }
            style={styles.zoom_In}
          >{console.log(this.state.zoom, 'ZoomedIn!!')} 
            <Feather name='zoom-in' size={40} color='white'/>
          </TouchableOpacity>
        </View>
        {/* ------------CAMERA COMPONENT ----------------------------------------------------------------------------------------- */}
        <Camera
          useCamera2Api={false}
          ref={ref => { this.camera = ref;}}
          style={styles.preview}
          type={this.state.type}
          flashMode={this.state.flashMode}
          ratio={this.state.ratio}
          zoom={this.state.zoom}
          >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
          </View>
        </Camera>

        {/* -------------------------------------------------------------------------------------------------------------------- */}
        <View style={styles.controlsBar}>
          <TouchableOpacity
            style={styles.flipCamera}
            onPress={() => {
              this.setState({
                type:
                  this.state.type === 'back'
                    ? 'front'
                    : 'back',
              });
            }}
          >
            <Ionicons name="md-reverse-camera" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.takePicture}
            style={styles.takePictureButton}
          >
            <Ionicons name="ios-radio-button-off" size={75} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flash}
            onPress={this.toggleFlash}
          >
            <MaterialIcons name={flashIcons[this.state.flashMode]} size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
};
export default CameraPage;