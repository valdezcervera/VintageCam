import React from 'react';
import { View, Text, TouchableOpacity, Image, CameraRoll, Button, StatusBar } from 'react-native';
import Camera from './components/camera.component'
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
  //camera entity, where we will create the components ref so we can later use 'camera.takePictureAsync' (camera component setCamera prop)
  camera = null;

  state = {
    hasCameraPermission: false,
    hasSaveToCameraRoll: false,
    type: 'back',
    ratio: '1:1',
    ratios: [], //SHOULD I???
    newPhotos: false, //SHOULD I???
    OptionsMenu: false,
    flashMode: 'off',
    zoom: 0,
    autoFocus: 'on',
    whiteBalance: 'auto',
    pictureSize: undefined,
    pictureSizes: [],
    pictureSizeId: 0,
    showGallery: false,
    AskAgainPermision: false,
  };

  getPermissions = async () => {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const hasCameraPermission = (camera.status === 'granted');
    const hasSaveToCameraRoll = (cameraRoll.status === 'granted');
    this.setState({ hasCameraPermission, hasSaveToCameraRoll });
  }
  async componentDidMount() {
    this.getPermissions();
  };

  //=================================================CAMERA CONTROLS==================================================================//
  //FLASH
  toggleFlash = () => this.setState({ flashMode: flashModeOrder[this.state.flashMode] });
  //ZOOM 
  zoomIn = () => this.setState({ zoom: this.state.zoom + 0.05 > 1 ? 1 : this.state.zoom + 0.05 });
  zoomOut = () => this.setState({ zoom: this.state.zoom - 0.05 < 0 ? 0 : this.state.zoom - 0.05 });
  //SHUTTER BUTTON
  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.saveToRoll });
    }
  };
  saveToRoll = (photo) => CameraRoll.saveToCameraRoll(photo.uri)

  //handleMountError = ({ message }) => console.error(message);


  render() {
    const { hasCameraPermission, hasSaveToCameraRoll, type, flashMode, ratio, zoom } = this.state;

    if (!hasCameraPermission || !hasSaveToCameraRoll) {
      return (
        <View style={styles.permissionDenied}>
          <Text>
            Access to camera has been denied.
          </Text>
          <Button
            title='Aks for permissions again'
            onPress={this.getPermissions}
          />
        </View>
      )
    }

    return (
      // Main Container View
      <View style={styles.background}>
      <StatusBar hidden />
        <Image source={require('../assets/shinyLeatherBlack.jpg')} style={styles.background} />
        {/* topControlls ==== zoom buttons */}
        <View style={styles.topBarControls}>
          <TouchableOpacity
            onPress={this.zoomOut}
            style={styles.zoom_Out}
          >
            <Feather name='zoom-out' size={40} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.zoomIn}
            style={styles.zoom_In}
          >
            <Feather name='zoom-in' size={40} color='white' />
          </TouchableOpacity>
        </View>

        {/* ------------CAMERA COMPONENT ----------------------------------------------------------------------------------------- */}
        <Camera
          config={{ type, flashMode, ratio, zoom }}
          setCamera={(ref) => this.camera = ref}
        />

        {/* BottomControlls */}
        <View style={styles.controlsBar}>
          {/* FLIP CAMERA */}
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
          {/* Shutter Button */}
          <Image
              source={require('../assets/buttons/shutterButton.png')}
              fadeDuration={0}
              style={{width: 146, height: 146, position: 'absolute', left:'29%'}}
          />
          <TouchableOpacity
            onPress={this.takePicture}
            style={styles.takePictureButton}
            activeOpacity={.7} 
          >
            <Image
              source={require('../assets/buttons/shutterButton.png')}
              fadeDuration={0}
              style={{width: 150, height: 150, }}
            />
          </TouchableOpacity>
          {/* Togle Flash */}
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







  // FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'Moment').catch(e => {
  //   console.log(e, 'Directory exists'); 
  // });


  // Maybe create a separate folder for the app??
  // onPictureSaved = async photo => {
  //     await FileSystem.moveAsync({
  //         from: photo.uri,
  //         to: `${FileSystem.documentDirectory}VintagePhotos/${Date.now()}.jpg`,
  //     });
  //     this.setState({ newPhotos: true });
  // }  // Maybe create a separate folder for the app??
  // onPictureSaved = async photo => {
  //     await FileSystem.moveAsync({
  //         from: photo.uri,
  //         to: `${FileSystem.documentDirectory}VintagePhotos/${Date.now()}.jpg`,
  //     });
  //     this.setState({ newPhotos: true });
  // }

