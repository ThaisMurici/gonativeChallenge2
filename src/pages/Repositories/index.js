import React, { Component } from 'react';

import {
  View, TextInput, TouchableOpacity, AsyncStorage, FlatList,
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
  };

  componentDidMount() {
    this.loadSavedRepositories();
  }

  loadSavedRepositories = async () => {
    const savedRepositories = await AsyncStorage.getItem('@GitIssues:repositoriesList');
    if (savedRepositories) {
      this.setState({ repositoriesList: JSON.parse(savedRepositories) });
    }
  };

  addRepository = async () => {
    const { repository, repositoriesList, reRenderListTrigger } = this.state;

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
  };

  renderListItem = ({ item }) => <ListItem repository={item} />;

  render() {
    const { repositoriesList, test } = this.state;
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

        <FlatList
          data={repositoriesList}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderListItem}
          extraData={test}
        />
      </View>
    );
  }
}
