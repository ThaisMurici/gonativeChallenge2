import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const ListItem = ({ repository, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image style={styles.avatar} source={{ uri: repository.avatar }} />
    <View style={styles.info}>
      <Text style={styles.name}>{repository.name}</Text>
      <Text style={styles.organization}>{repository.organization}</Text>
    </View>

    <Icon name="chevron-right" style={styles.icon} />
  </TouchableOpacity>
);

ListItem.propTypes = {
  repository: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    organization: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ListItem;
