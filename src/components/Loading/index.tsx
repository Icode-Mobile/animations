import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface LoadingProps {}

export const Loading = ({}: LoadingProps) => {
  const spinner = useSharedValue(0);

  const spinnerAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${spinner.value}deg`,
        },
      ],
    };
  }, [spinner.value]);

  useEffect(() => {
    spinner.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
    return () => cancelAnimation(spinner);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../image/loading.png')}
        style={[styles.image, spinnerAnimated]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 80,
    height: 80,
  },
});
