import Reactotron from 'reactotron-react-native';

const tron = Reactotron.configure()
  .useReactNative()
  .connect()
  .configure({ host: '192.168.1.3' });

tron.clear();

console.tron = tron;
