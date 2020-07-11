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

  const incrementTimerOnSwipe = (pageX: number) => {
    const { isSwipingRight } = getSwipeDirection(pageX);
    if (isSwipingRight) {
      const nextTimer = timer + 1;
      setTimer(nextTimer >= maxInterval ? 0 : nextTimer);
    }
  };

  const decrementTimerOnSwipe = (pageX: number) => {
    const { isSwipingLeft } = getSwipeDirection(pageX);
    if (isSwipingLeft) {
      const nextTimer = timer - 1;
      setTimer(nextTimer <= 0 ? maxInterval : nextTimer);
    }
  };

  const changeTimerOnSwipe = (pageX: number) => {
    if (!started) {
      incrementTimerOnSwipe(pageX);
      decrementTimerOnSwipe(pageX);
    }
  };

  const updatePreviousTouch = (pageX: number) => {
    previousTouch = pageX;
  };

  const handleSwipeGesture = ({
    nativeEvent: { pageX },
  }: GestureResponderEvent) => {
    changeTimerOnSwipe(pageX);
    updatePreviousTouch(pageX);
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
      // giving the container a style
      // seems to fix android bug where
      // gestures are not handled
      style={{ backgroundColor: "white" }}
      onTouchEnd={() => {
        previousTouch = undefined;
      }}
      onTouchMove={handleSwipeGesture}
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
}
