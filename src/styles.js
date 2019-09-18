import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('screen').width;

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
        width: '100%',
    },
    camera: {
        flex: 1,
        justifyContent: 'space-between',
    },
    controlsBar: {
        flexDirection: 'row',
        position: "absolute",
        bottom: '7%',
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
        position: "absolute",
        top: 15,
        width: Width,
        alignItems: 'center',
    },
    zoom_In: {
        alignItems: 'flex-end',
        width: '50%',
    },
    zoom_Out: {
        alignItems: 'flex-start',
        width: '50%',
    }

});