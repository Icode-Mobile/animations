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

interface BouncingProps {}

export const Bouncing = ({}: BouncingProps) => {
  const bouncing = useSharedValue(0);

  const bouncingAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: bouncing.value,
        },
      ],
    };
  }, [bouncing.value]);

  useEffect(() => {
    bouncing.value = withRepeat(
      withTiming(-10, {
        duration: 800,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    return () => cancelAnimation(bouncing);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, bouncingAnimated]} />
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
  ball: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff0000',
  },
});
