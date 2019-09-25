import React from 'react';
import styles from '../styles.js';
import { View } from 'react-native';
import { Camera } from 'expo-camera';


function CameraComponent(props) {

    return (
        <Camera
            useCamera2Api={false}
            ref={props.setCamera} 
            style={styles.preview}
            type={props.config.type}
            flashMode={props.config.flashMode}
            ratio={props.config.ratio}
            zoom={props.config.zoom}
            whiteBalance={props.config.whiteBalance}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}>
            </View>
        </Camera>);
}

export default CameraComponent;