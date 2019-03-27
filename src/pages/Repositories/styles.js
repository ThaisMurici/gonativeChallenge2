import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: metrics.basePadding,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 40,
    paddingHorizontal: metrics.basePadding,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: metrics.baseMargin,
    backgroundColor: colors.sucess,
    borderRadius: metrics.baseRadius,
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.baseMargin,
    height: 30,
    backgroundColor: colors.danger,
    borderRadius: metrics.baseRadius,
  },
  errorText: {
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default styles;
