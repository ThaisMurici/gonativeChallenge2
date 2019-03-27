import React, { Component } from 'react';
import api from '~/services/api';

import {
  Text, View, TouchableOpacity, FlatList,
} from 'react-native';

import styles from './styles';
import ListItem from '~/components/ListItem';

export default class Issues extends Component {
  static navigationOptions = {
    title: 'Issues',
  };

  state = {
    issues: [],
    filteredIssues: [],
    currentTab: 'All',
    reRenderListTrigger: false,
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    const { navigation } = this.props;
    const repository = navigation.getParam('repository', '');
    const { data } = await api.get(`/repos/${repository.organization}/${repository.name}/issues?state=all`);
    this.setState({ issues: data, filteredIssues: data });
  }

  filterIssues = () => {}

  tabPressed = (tab) => {
    const { issues, reRenderListTrigger } = this.state;
    let filteredIssues = [];
    switch (tab) {
      case 'Open':
        filteredIssues = issues.filter(item => item.state === 'open');
        this.setState({ currentTab: tab, filteredIssues, reRenderListTrigger: !reRenderListTrigger });
        break;
      case 'Closed':
        filteredIssues = issues.filter(item => item.state === 'closed');
        this.setState({ currentTab: tab, filteredIssues, reRenderListTrigger: !reRenderListTrigger });
        break;
      default:
        this.setState({ currentTab: tab, filteredIssues: issues, reRenderListTrigger: !reRenderListTrigger });
        break;
    }
  }

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

  renderListItem = ({ item }) => (
    <ListItem
      title={item.title}
      avatar={item.user.avatar_url}
      author={item.user.login}
      onPress={() => {}}
    />
  );

  render() {
    const { filteredIssues, reRenderListTrigger } = this.state;
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

        <FlatList
          data={filteredIssues}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderListItem}
          extraData={reRenderListTrigger}
        />
      </View>
    );
  }
}
