import { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");

export type CelebrationShowerProps = {
  count?: number;
  duration?: number;
};

const colors = ["#FAC775", "#854F0B"];

export const CelebrationShower = ({ count = 35, duration = 2500 }: CelebrationShowerProps) => {
  const particles = useRef(
    Array.from({ length: count }, (_, index) => ({
      id: index,
      x: Math.random() * width,
      size: Math.random() * 8 + 5,
      delay: Math.random() * 500,
      rotate: Math.random() * 360,
      color: colors[index % colors.length],
    })),
  ).current;

  return (
    <View pointerEvents="none" className="absolute inset-0 z-[50]">
      {particles.map((particle) => (
        <CelebrationParticle key={particle.id} {...particle} duration={duration} />
      ))}
    </View>
  );
};

export type CelebrationParticleProps = {
  x: number;
  size: number;
  delay: number;
  rotate: number;
  color: string;
  duration: number;
};

const CelebrationParticle = ({ x, size, delay, rotate, color, duration }: CelebrationParticleProps) => {
  const translateY = useRef(new Animated.Value(-30)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: height + 50,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(rotation, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: [`${rotate}deg`, `${rotate + 360}deg`],
  });

  return (
    <Animated.View
      className="absolute"
      style={{
        left: x,
        top: 0,
        opacity,
        transform: [{ translateY }, { rotate: rotateInterpolation }],
      }}
    >
      <View
        style={{
          width: size,
          height: size * 1.8,
          backgroundColor: color,
          borderRadius: 2,
        }}
      />
    </Animated.View>
  );
};
