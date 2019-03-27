import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
    padding: metrics.basePadding,
  },
  tabBar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: metrics.baseRadius,
    borderColor: colors.light,
    borderWidth: 1,
  },
  tab: {
    height: 38,
    width: (metrics.screenWidth - 2 - metrics.basePadding * 2) / 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTab: {
    height: 38,
    width: (metrics.screenWidth - 2 - metrics.basePadding * 2) / 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lighter,
    borderRadius: metrics.baseRadius,
  },
  tabText: {
    color: colors.regular,
  },
  selectedText: {
    fontWeight: 'bold',
    color: colors.dark,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: metrics.baseMargin * 2,
  },
});

export default styles;
