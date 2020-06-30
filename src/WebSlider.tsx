import React from 'react';
import { Platform, View } from 'react-native';

import Slider from '@react-native-community/slider';

import { maxInterval } from './constants';

export const WebSlider = ({
  started,
  timer,
  onChange,
}: {
  started: boolean;
  timer: number;
  onChange: (num: number) => void;
}) => {
  if (Platform.OS === "web" && !started) {
    return (
      <View
        style={{
          position: "absolute",
          width: 300,
          bottom: "20%",
        }}
      >
        <Slider
          style={{ height: 40 }}
          minimumValue={1}
          step={1}
          maximumValue={maxInterval}
          value={timer}
          onValueChange={onChange}
          minimumTrackTintColor="tomato"
          maximumTrackTintColor="tomato"
        />
      </View>
    );
  }
  return null;
};
