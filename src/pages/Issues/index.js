import React, { Component } from 'react';

import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class Issues extends Component {
  static navigationOptions = {
    title: 'Issues',
  };

  state = {
    currentTab: 'All',
  };

  tabPressed = tab => this.setState({ currentTab: tab });

  tabStyle = (tab) => {
    const { currentTab } = this.state;
    const style = currentTab === tab ? styles.selectedTab : styles.tab;
    return style;
  };

  textStyle = (tab) => {
    const { currentTab } = this.state;
    const style = currentTab === tab ? styles.selectedText : styles.tabText;
    return style;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <TouchableOpacity style={this.tabStyle('All')} onPress={() => this.tabPressed('All')}>
            <Text style={this.textStyle('All')}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.tabStyle('Open')} onPress={() => this.tabPressed('Open')}>
            <Text style={this.textStyle('Open')}>Open</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.tabStyle('Closed')}
            onPress={() => this.tabPressed('Closed')}
          >
            <Text style={this.textStyle('Closed')}>Closed</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
