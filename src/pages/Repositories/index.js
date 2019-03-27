import React, { Component } from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import api from '~/services/api';
import ListItem from '~/components/ListItem';

export default class Repositories extends Component {
  static navigationOptions = {
    title: 'Repositories',
  };

  state = {
    repositoriesList: [],
    repository: '',
    reRenderListTrigger: false,
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.loadSavedRepositories();
  }

  loadSavedRepositories = async () => {
    this.setState({ refreshing: true });
    const savedRepositories = await AsyncStorage.getItem('@GitIssues:repositoriesList');
    if (savedRepositories) {
      this.setState({
        repositoriesList: JSON.parse(savedRepositories) || [],
        loading: false,
        refreshing: false,
      });
    }
  };

  repositoryExists = (requestedRepository, savedRepositories) => {
    const requestedData = requestedRepository.split('/');
    const repositoryExists = savedRepositories.filter(
      item => item.organization.toLowerCase() === requestedData[0].toLowerCase()
        && item.name.toLowerCase() === requestedData[1].toLowerCase(),
    );
    return repositoryExists.length > 0;
  };

  addRepository = async () => {
    const { repository, repositoriesList, reRenderListTrigger } = this.state;

    const savedRepositories = await AsyncStorage.getItem('@GitIssues:repositoriesList');
    const parsedList = savedRepositories ? JSON.parse(savedRepositories) : [];

    if (!savedRepositories || !this.repositoryExists(repository, parsedList)) {
      try {
        const { data } = await api.get(`/repos/${repository}`);
        repositoriesList.push({
          id: data.id,
          name: data.name,
          organization: data.owner.login,
          avatar: data.owner.avatar_url,
        });

        await AsyncStorage.setItem('@GitIssues:repositoriesList', JSON.stringify(repositoriesList));
        this.setState({ repositoriesList, reRenderListTrigger: !reRenderListTrigger });
      } catch (error) {}
    }
  };

  showIssues = (repository) => {
    const { navigation } = this.props;
    navigation.navigate('Issues', { repository });
  };

  renderListItem = ({ item }) => (
    <ListItem
      title={item.name}
      avatar={item.avatar}
      author={item.organization}
      onPress={() => this.showIssues(item)}
    />
  );

  renderList = () => {
    const { repositoriesList, reRenderListTrigger, refreshing } = this.state;
    return (
      <FlatList
        data={repositoriesList}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadSavedRepositories}
        refreshing={refreshing}
        extraData={reRenderListTrigger}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Add new repository"
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ repository: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.addRepository}>
            <Icon name="plus" size={16} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
