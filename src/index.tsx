import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  GestureResponderEvent,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useCountdown } from "use-moment-countdown";
import { Platform } from "react-native";

import { Background } from "./Background";
import { Container } from "./Container";
import { Time } from "./Time";
import { BarContainer } from "./BarContainer";
import { Bar } from "./Bar";
import { Sound } from "./Sound";
import { Triangle } from "./Triangle";

export const PomodoroTimer = () => {
  const maxInterval = 60;
  const initTimer = 25;
  const [timer, setTimer] = useState(initTimer);

  const { time, start, started, stop, paused, reset } = useCountdown(
    { m: timer },
    { onDone: () => new Sound().play(), recurring: true }
  );

  const left = (timer / maxInterval) * 100;

  let previousTouch = useRef<number | undefined>().current;
  const getSwipeDirection = (currentTouch: number) => {
    previousTouch = previousTouch || currentTouch;
    const isSwipingLeft = previousTouch > currentTouch;
    const isSwipingRight = previousTouch < currentTouch;
    return { isSwipingRight, isSwipingLeft };
  };

  const handleGesture = ({ nativeEvent: { pageX } }: GestureResponderEvent) => {
    if (started) {
      return;
    }
    const { isSwipingRight, isSwipingLeft } = getSwipeDirection(pageX);
    if (isSwipingRight) {
      const nextTimer = timer + 1;
      setTimer(nextTimer >= maxInterval ? 0 : nextTimer);
    } else if (isSwipingLeft) {
      const nextTimer = timer - 1;
      setTimer(nextTimer <= 0 ? maxInterval : nextTimer);
    }
    previousTouch = pageX;
  };

  const handlePress = () => {
    if (!started || paused) {
      start();
    } else {
      stop();
    }
  };

  return (
    <Container
      onTouchEnd={() => {
        previousTouch = undefined;
      }}
      onTouchMove={handleGesture}
    >
      <TouchableOpacity onPress={handlePress}>
        <Background>
          <Time>
            {timer === 60 && !started ? "60:00" : time.format("mm:ss")}
          </Time>
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
              }}
            />
            {new Array(maxInterval / 10).fill().map((_, i) => (
              <Bar key={i} />
            ))}
          </BarContainer>
        </Background>
      </TouchableOpacity>
      <View style={{ position: "absolute", bottom: "30%" }}>
        {paused && <Button title="Reset" onPress={reset} />}
      </View>
      {Platform.OS === "web" && !started && (
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
            onValueChange={setTimer}
            minimumTrackTintColor="tomato"
            maximumTrackTintColor="tomato"
          />
        </View>
      )}
    </Container>
  );
};
