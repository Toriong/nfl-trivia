import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const FadeUpAndOut = ({
  children,
  _willFadeIn,
  takeContainerOffOfVirutalDom,
  durationMs = 1000,
  delayMs = 0,
  willFadeOut,
  dynamicStyles = {},
  endTranslateNum = 0,
  startingOpacity = 0,
}) => {
  const opacity = useRef(new Animated.Value(startingOpacity)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const [willFadeLayoutIn, setWillFadeLayoutIn] = _willFadeIn


  useEffect(() => {
    if (willFadeLayoutIn) {
      const animation = Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          durationMs,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: endTranslateNum,
          durationMs,
          useNativeDriver: true,
        })
      ]);

      delayMs ? setTimeout(() => animation.start(), delayMs) : animation.start();
      setWillFadeLayoutIn(false);
    }
  }, [willFadeLayoutIn]);

  useEffect(() => {
    if (willFadeOut) {
      const animation = Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          durationMs,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          durationMs,
          useNativeDriver: true,
        })
      ]);

      if(takeContainerOffOfVirutalDom){
        takeContainerOffOfVirutalDom()
      }

      animation.start()
    }
  }, [willFadeOut])

  return (
    <Animated.View style={{ ...dynamicStyles, opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};

export default FadeUpAndOut;
