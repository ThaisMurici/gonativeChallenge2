import { createAppContainer, createStackNavigator } from 'react-navigation';

import Issues from '~/pages/Issues';
import Repositories from '~/pages/Repositories';

import { colors, metrics } from '~/styles';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Repositories,
      Issues,
    },
    {
      initialRouteName: 'Repositories',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.darker,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  ),
);

export default Routes;
