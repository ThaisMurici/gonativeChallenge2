import React, { Component } from 'react';

import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    title: 'Repositories',
  };

  state = {
    data: [],
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Add new repository"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Icon name="plus" size={16} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
