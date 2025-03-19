import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View, Text} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color} from '../config/Env';
type DraggableComponentProps = {
  children: ReactNode;
  width: number;
  height: number;
  mid: ReactNode | null;
  right: ReactNode | null;
  active: boolean;
  onRight: () => void;
};
const DraggableComponent: React.FC<DraggableComponentProps> = ({
  width,
  height,
  children,
  mid,
  right,
  active,
  onRight,
}) => {
  const viewWidth = width || responsiveScreenWidth(65);
  const viewHeight = height || responsiveScreenHeight(6);
  const startStateX = viewWidth / 2 - viewWidth + viewHeight / 2;
  const endStateX = viewWidth / 2 - viewHeight / 2;
  const midPoint = (startStateX + endStateX) / 2;
  // const [opacity, setOpacity] = useState(1)
  const [pan, setPan] = useState(
    new Animated.ValueXY({x: !active ? startStateX : endStateX, y: 0}),
  );
  useEffect(() => {
    Animated.spring(pan, {
      toValue: {x: startStateX, y: 0},
      speed: 1,
      useNativeDriver: false,
      bounciness: -10,
    }).start();
  }, [active]);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setValue({x: !active ? startStateX : endStateX, y: 0});
      },
      onPanResponderMove: (e, gestureState) => {
        let newX = pan.x._value;
        if (gestureState.dx < endStateX * 2 && gestureState.dx > 0) {
          newX = gestureState.dx + startStateX;
        } else if (gestureState.dx > startStateX * 2 && gestureState.dx < 0) {
          newX = gestureState.dx + endStateX;
        }
        pan.x.setValue(newX);
      },
      onPanResponderRelease: () => {
        const snapTo = pan.x._value > midPoint ? endStateX : startStateX;
        if (pan.x._value > midPoint) {
          onRight();
        }
        Animated.spring(pan, {
          toValue: {x: snapTo, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <View
      style={{
        backgroundColor: color.white,
        borderRadius: 200,
        width: viewWidth,
        height: viewHeight,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: responsiveScreenHeight(2.5),
        padding: responsiveScreenWidth(1.2),
      }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.draggable, {transform: pan.getTranslateTransform()}]}>
        {children}
      </Animated.View>
      <View></View>
      <View style={{position: 'absolute', margin: 'auto', zIndex: -1}}>
        {mid}
      </View>
      <View
        style={{
          position: 'absolute',
          margin: 'auto',
          zIndex: -1,
          right: responsiveScreenWidth(1.2),
        }}>
        {right}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  draggable: {
    height: '90%',
    aspectRatio: 1,
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default DraggableComponent;
