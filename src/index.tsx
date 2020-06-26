import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { Button, Slider, Text, View } from "react-native";
import { useInterval } from "../hooks/useInterval";

export const PomodoroTimer = () => {
  const [intervalNum, setIntervalNum] = useState(15);
  const intervalInMs = intervalNum * 60 * 1000;
  const [count, setCount] = useState(0)
  const diff = intervalInMs - count
  const [started, setStarted] = useState(false)
  const remainingDuration = moment.duration(diff, "milliseconds")
  const remainingMilliseconds = remainingDuration.asMilliseconds()
  const remainingMinutes = moment.utc(remainingMilliseconds).format("mm:ss")
  useInterval(() => {
    if (started && remainingMilliseconds !== 0) {
      setCount(count + 1000)
    }
  }, 1000)
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Text>{remainingMinutes}</Text>
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
      <Button title={"Start"} onPress={() => setStarted(true)} />
    </View>
  );
};
