import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { Button, Slider, Text, View } from "react-native";
import { useInterval } from "../hooks/useInterval";
import { useCountdown } from "../hooks/useCountdown";


export const PomodoroTimer = () => {
  const [intervalNum, setIntervalNum] = useState(15);
  const {time, start} = useCountdown({m: intervalNum})
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Text>{time.format("mm:ss")}</Text>
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
      <Button title={"Start"} onPress={start} />
    </View>
  );
};
