module.exports = {
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@react-navigation|@rneui)/)'
      ],
    transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    }
  };