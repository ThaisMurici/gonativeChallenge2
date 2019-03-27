import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Text, View, TouchableOpacity, FlatList, ActivityIndicator, Linking,
} from 'react-native';

import styles from './styles';
import ListItem from '~/components/ListItem';

export default class Issues extends Component {
  static navigationOptions = {
    title: 'Issues',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    issues: [],
    filteredIssues: [],
    currentTab: 'All',
    reRenderListTrigger: false,
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    this.setState({ refreshing: true });
    const { navigation } = this.props;
    const repository = navigation.getParam('repository', '');
    const { data } = await api.get(`/repos/${repository.organization}/${repository.name}/issues?state=all`);
    this.setState({
      issues: data,
      filteredIssues: data,
      loading: false,
      refreshing: false,
    });
  }

  tabPressed = (tab) => {
    const { issues, reRenderListTrigger } = this.state;
    let filteredIssues = [];
    switch (tab) {
      case 'Open':
        filteredIssues = issues.filter(item => item.state === 'open');
        this.setState({
          currentTab: tab,
          filteredIssues,
          reRenderListTrigger: !reRenderListTrigger,
        });
        break;
      case 'Closed':
        filteredIssues = issues.filter(item => item.state === 'closed');
        this.setState({
          currentTab: tab,
          filteredIssues,
          reRenderListTrigger: !reRenderListTrigger,
        });
        break;
      default:
        this.setState({
          currentTab: tab,
          filteredIssues: issues,
          reRenderListTrigger: !reRenderListTrigger,
        });
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

  openIssueInBrowser = (url) => {
    Linking.openURL(url).catch(() => {});
  }

  renderListItem = ({ item }) => (
    <ListItem
      title={item.title}
      avatar={item.user.avatar_url}
      author={item.user.login}
      onPress={() => this.openIssueInBrowser(item.html_url)}
    />
  );

  renderList = () => {
    const { filteredIssues, reRenderListTrigger, refreshing } = this.state;
    return (filteredIssues.length > 0 ? (
      <FlatList
        data={filteredIssues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        extraData={reRenderListTrigger}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
      />
    ) : (
      <View style={styles.empty}>
        <Icon style={styles.emptyIcon} name="exclamation" />
        <Text>No issues here!</Text>
      </View>
    ));
  }

  render() {
    const { loading } = this.state;
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

        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
