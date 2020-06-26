import moment from "moment";
import React, { useState, useRef } from "react";
import { Button, Slider, Text, View } from "react-native";

export const PomodoroTimer = () => {
  const [intervalNum, setIntervalNum] = useState(15);
  const intervalInSeconds = intervalNum * 60 * 1000

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Slider
        step={1}
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={60}
        onValueChange={setIntervalNum}
        value={intervalNum}
        minimumTrackTintColor="tomato"
        maximumTrackTintColor="tomato"
      />
      <Button title={"Start"} onPress={() => true} />
    </View>
  );
};
