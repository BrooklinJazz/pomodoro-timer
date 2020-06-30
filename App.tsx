import React, { useRef, useState } from "react";
import { initTimer, maxInterval } from "./src/constants";
import { Sound } from "./src/Sound";
import { GestureResponderEvent } from "react-native";
import { useCountdown } from "use-moment-countdown";
import { Container } from "./src/Container";
import { PomodoroTimer } from "./src/PomodoroTimer";
import { ResetButton } from "./src/ResetButton";
import { WebSlider } from "./src/WebSlider";

export default function App() {
  const [timer, setTimer] = useState(initTimer);

  const { time, start, started, stop, paused, reset } = useCountdown(
    { m: timer },
    { onDone: () => new Sound().play(), recurring: true }
  );

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
      <PomodoroTimer
        time={time}
        started={started}
        timer={timer}
        handlePress={handlePress}
      />
      <ResetButton reset={reset} paused={paused} />
      <WebSlider timer={timer} started={started} onChange={setTimer} />
    </Container>
  );
};
