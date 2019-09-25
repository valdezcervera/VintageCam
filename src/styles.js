import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;
export default StyleSheet.create({
    preview: {
        height: Width,
        width: Width,
        position: 'absolute',
        left: 0,
        top: '15%',
        right: 0,
        bottom: 0,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        height: Height,
    },
    camera: {
        flex: 1,
        justifyContent: 'space-between',
    },
    controlsBar: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '3%',
        width: Width,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    takePictureButton: {
        alignItems: 'center',
        width: '50%',
    },
    flipCamera: {
        alignItems: 'center',
        width: '25%',
    }, 
    flash: {
        alignItems: 'center',
        width: '25%',
    },
    topBarControls: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '18%',
        width: Width,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    zoom_In: {
        alignItems: 'center',
        width: '25%',
    },
    zoom_Out: {
        alignItems: 'center',
        width: '25%',
    },
    white_Balance: {
        alignItems: 'center',
        width: '50%',
    },
    permissionDenied: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    }

});