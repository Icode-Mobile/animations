import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeInUp,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ProgressProps {}

const messages = [
  {
    text: 'Fazendo a transferencia',
  },
  {
    text: 'Quase lá...',
  },
  {
    text: 'Pronto!',
  },
];

export const Progress = ({}: ProgressProps) => {
  const progress = useSharedValue(0);
  const [index, setIndex] = useState<number>(0);

  const progressAnimated = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress.value}%`, {
        duration: 500,
      }),
    };
  });

  useEffect(() => {
    if (index < 2) {
      setInterval(() => {
        if (progress.value === 0) {
          progress.value = 50;
          setIndex(1);
        } else if (progress.value === 50) {
          progress.value = 100;
          setIndex(2);
        }
      }, 2000); // 2 segundos
    } else {
      alert('Transferencia foi concluida');
    }
  }, [index]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Animated.Text layout={Layout} entering={FadeInUp} style={styles.text}>
          {messages[index].text}
        </Animated.Text>
        <View style={styles.progressBox}>
          <Animated.View style={[styles.progress, progressAnimated]} />
        </View>
      </View>
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
  box: {
    position: 'absolute',
    bottom: 50,
    width: '95%',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 24,
    width: '50%',
    marginBottom: 20,
  },
  progressBox: {
    backgroundColor: 'gray',
    width: '100%',
    height: 12,
    borderRadius: 10,
  },
  progress: {
    backgroundColor: 'purple',
    height: 12,
    borderRadius: 10,
  },
});
