import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const ListItem = ({
  avatar, title, author, onPress,
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image style={styles.avatar} source={{ uri: avatar }} />
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.organization}>{author}</Text>
    </View>

    <Icon name="chevron-right" style={styles.icon} />
  </TouchableOpacity>
);

ListItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ListItem;
