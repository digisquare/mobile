jest.mock('react-native-fabric', () => ({
  crash: () => {},
}));

jest.mock('@exponent/ex-navigation', () => ({
  withNavigation: () => {},
  createRouter: () => {},
}));
