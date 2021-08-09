import {StyleSheet} from 'react-native';

export const size = {
  h1: 30,
  h2: 24,
  h3: 18,
  h4: 16,
  large: 24,
  base: 18,
  small: 16,
  thin: 14,
  xthin: 12,
};

export default StyleSheet.create({
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  h4: {
    fontSize: size.h4,
  },
  large: {
    fontSize: size.large,
  },
  base: {
    fontSize: size.base,
  },
  small: {
    fontSize: size.small,
  },
  thin: {
    fontSize: size.thin,
  },
});
