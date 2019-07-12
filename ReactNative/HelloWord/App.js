/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
	  <Video source={{uri: "http://61.155.107.41:8893/13813922222_13813922222_61-155-107-41_11130.2.8.0.20180614-155100-32.123456-118.123456"}}  
           ref={(ref) => {
             this.player = ref
           }}                                     
           onBuffer={this.onBuffer}                
           onError={this.videoError}               
           style={styles.backgroundVideo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
