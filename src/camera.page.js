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

const frontRearOrder = {
  front: 'back',
  back: 'front'
}

const frontRearIcons = {
  front: 'camera-front',
  back: 'camera-rear'
}

const whiteBalanceOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto'
}
const whiteBalanceIcons = {
  auto: 'white-balance-auto',
  sunny: 'white-balance-sunny',
  cloudy: 'weather-partlycloudy',
  shadow: 'checkbox-blank',
  fluorescent: 'white-balance-iridescent',
  incandescent: 'white-balance-incandescent',
}


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
    whiteBalance: 'cloudy',
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
  //WHITE BALANCE
  toggleWhiteBalance = () => this.setState({ whiteBalance: whiteBalanceOrder[this.state.whiteBalance]})
  //FLASH
  toggleFlash = () => this.setState({ flashMode: flashModeOrder[this.state.flashMode] });
  //ZOOM 
  zoomIn = () => this.setState({ zoom: this.state.zoom + 0.05 > 1 ? 1 : this.state.zoom + 0.05 });
  zoomOut = () => this.setState({ zoom: this.state.zoom - 0.05 < 0 ? 0 : this.state.zoom - 0.05 });
  //FRONT-REAR
  toggleFrontRear = () => this.setState({ type: frontRearOrder[this.state.type] })
  //SHUTTER BUTTON
  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.saveToRoll });
    }
  };
  saveToRoll = (photo) => CameraRoll.saveToCameraRoll(photo.uri)

  //handleMountError = ({ message }) => console.error(message);


  render() {
    const { hasCameraPermission, hasSaveToCameraRoll, type, flashMode, ratio, zoom, whiteBalance } = this.state;

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
        {/* <Image source={require('../assets/logo/MomentoTrans.png')} style={{position: "absolute", top:10, right: '30%'}} /> */}
        <View style={styles.topBarControls}>
        {/* topControlls =============================  ZOOM BUTTON 1  ========================================= */}
          {/* ===Out=== */}
          <Image
              source={require('../assets/buttons/slim.png')}
              fadeDuration={0}
              style={{ width: 79, height: 69, position: "absolute", left: 6  }}
            />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.zoomOut}
            style={styles.zoom_Out}
          >
            <Image source={require('../assets/buttons/slim.png')} style={{ width: 80, height: 70 }} />
            <Feather name='zoom-out' size={24} color='#404040' style={{position: "absolute", top:23}}/>
          </TouchableOpacity>
          {/* ========================================== WHITE BALANCE ========================================== */}
          <Image 
              source={require('../assets/buttons/square.png')}
              style={{width: 46, height: 46, position: "absolute", left:'44%'}}
          />
          <TouchableOpacity 
              activeOpacity={0.5}
              onPress={this.toggleWhiteBalance}
              style={styles.white_Balance}
          >
            <Image 
            source={require('../assets/buttons/square.png')} 
            style={{width: 46, height: 46 }}
          />
            <MaterialCommunityIcons name={whiteBalanceIcons[this.state.whiteBalance]} 
            size={35} color='#404040' 
            style={{ position: "absolute", top:5 }}/>
          </TouchableOpacity>
           {/* topControlls =============================  ZOOM BUTTON 1  ========================================= */}
          {/* ===In=== */}
          <Image
              source={require('../assets/buttons/slim.png')}
              fadeDuration={0}
              style={{ width: 79, height: 69, position: "absolute", right: 6  }}
            />
          <TouchableOpacity
            activeOpacity={.5}
            onPress={this.zoomIn}
            style={styles.zoom_In}
          >
          <Image
              source={require('../assets/buttons/slim.png')}
              fadeDuration={0}
              style={{ width: 80, height: 70, }}
            />
            <Feather name='zoom-in' size={24} color='#404040' style={{position: "absolute", top:23}}/>
          </TouchableOpacity>
        </View>

        {/* ===========================================CAMERA COMPONENT ===================================================== */}
        <Camera
          config={{ type, flashMode, ratio, zoom, whiteBalance }}
          setCamera={(ref) => this.camera = ref}
        />
        {/* ================================================================================================================= */}

        {/* ===================== TOGGLE FLASH ======================= */}
        <View style={styles.controlsBar}>
          <TouchableOpacity
            activeOpacity={.7}
            style={styles.flash}
            onPress={this.toggleFlash}
          >
            <Image
              source={require('../assets/buttons/square.png')}
              fadeDuration={0}
              style={{ width: 44, height: 44, }}
            />
            <Image source={require('../assets/buttons/square.png')} style={{ width: 45, height: 45, position: "absolute" }} />
            <MaterialIcons name={flashIcons[this.state.flashMode]} size={40} color="#404040" style={{ position: "absolute" }} />
          </TouchableOpacity>
          {/* ===================== SHUTTER BUTTON ======================= */}
          <Image
            source={require('../assets/buttons/shutterButton.png')}
            fadeDuration={0}
            style={{ width: 68, height: 68, position: 'absolute', left: '40%' }}
          />
          <TouchableOpacity
            onPress={this.takePicture}
            style={styles.takePictureButton}
            activeOpacity={.7}
          >
            <Image
              source={require('../assets/buttons/shutterButton.png')}
              fadeDuration={0}
              style={{ width: 70, height: 70, }}
            />
          </TouchableOpacity>
          {/* ===================== FLIP CAMERA ======================= */}
          <TouchableOpacity
            activeOpacity={.9}
            style={styles.flipCamera}
            onPress={this.toggleFrontRear}
          >
            <Image
              source={require('../assets/buttons/square.png')}
              fadeDuration={0}
              style={{ width: 43, height: 43, }}
            />
            <Image source={require('../assets/buttons/square.png')} style={{ width: 46, height: 46, position: "absolute" }} />
            <MaterialIcons name={frontRearIcons[this.state.type]} size={35} color="#505050" style={{ position: "absolute", top: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
};
export default CameraPage;


