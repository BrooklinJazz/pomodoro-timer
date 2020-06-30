import React from "react";
import {
  GestureResponderEvent,
  TouchableOpacity
} from "react-native";
import { Background } from "./Background";
import { Time } from "./Time";
import { BarContainer } from "./BarContainer";
import { Bar } from "./Bar";
import { Triangle } from "./Triangle";
import { maxInterval } from "./constants";
import { Moment } from "moment";

export const PomodoroTimer = ({
  handlePress,
  timer,
  started,
  time, }: {
    handlePress: (e: GestureResponderEvent) => void;
    timer: number;
    started: boolean;
    time: Moment;
  }) => {
  const left = (timer / maxInterval) * 100;
  return (
    <TouchableOpacity onPress={handlePress}>
      <Background>
        <Time>{timer === 60 && !started ? "60:00" : time.format("mm:ss")}</Time>
        <BarContainer>
          <Triangle
            style={{
              left: `${left}%`,
              transform: [
                {
                  scale: 4,
                },
                {
                  translateY: 7,
                },
              ],
            }} />
          {new Array(maxInterval / 10).fill("").map((_, i) => (
            <Bar key={i} />
          ))}
        </BarContainer>
      </Background>
    </TouchableOpacity>
  );
};
