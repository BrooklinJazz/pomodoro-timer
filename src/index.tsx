import React, { useState, useRef } from "react";
import { Button, GestureResponderEvent, TouchableOpacity, View } from "react-native";
import { useCountdown } from "use-moment-countdown";
import styled from "styled-components/native";
import Svg, { Path } from "react-native-svg";

const Container = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Background = styled.View`
  background-color: tomato;
  height: 200;
  width: 200;
  border-radius: 100px;
`;

const Time = styled.Text`
  color: white;
  font-size: 30;
  text-align: center;
  position: absolute;
  top: 30%;
  width: 100%;
`;

const BarContainer = styled.View`
  border-bottom-color: black;
  border-bottom-width: 2px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  top: 50%;
`;

const Bar = styled.View`
  height: 10px;
  width: 2px;
  background-color: black;
`;

export const PomodoroTimer = () => {
  const maxInterval = 60;
  const initTimer = 25;

  const [timer, setTimer] = useState(initTimer);
  const timerRemainder = timer % (maxInterval + 1);
  const { time, start, started, stop, paused, reset } = useCountdown(
    { m: timer },
    { onDone: () => true, recuring: true }
  );
  const left = (timerRemainder / maxInterval) * 100;

  let previousTouch = useRef<number | undefined>().current;

  const handleGesture = (e: GestureResponderEvent) => {
    const currentTouch = e.nativeEvent.pageX;
    previousTouch = previousTouch || currentTouch;
    if (started) {
      return;
    } else if (previousTouch < currentTouch) {
      setTimer(timer + 1);
      previousTouch = currentTouch;
    } else if (previousTouch > currentTouch) {
      setTimer(timer - (1 % maxInterval));
      previousTouch = currentTouch;
    }
  };
  return (
    <Container
      onTouchEnd={() => {
        previousTouch = undefined;
      }}
      onTouchMove={handleGesture}
    >
      <TouchableOpacity onPress={started ? stop : start}>
        <Background>
          <Time>
            {timerRemainder === 60 && !started ? "60:00" : time.format("mm:ss")}
          </Time>
          <BarContainer>
            <Svg
              style={{
                position: "absolute",
                left: `${left}%`,
                marginLeft: -3.5,
                height: 7,
                width: 7,
                transform: [{ scale: 4 }, { translateY: 7 }],
              }}
            >
              <Path
                d="M 3.5 0 L 0 7 L 7 7 z"
                transform={{ scale: 1 }}
                fill="#248f24"
              />
            </Svg>
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
          </BarContainer>
        </Background>
      </TouchableOpacity>
        <View style={{ position: "absolute", bottom: "30%" }}>
          {paused && <Button title="Reset" onPress={reset} />}
        </View>
    </Container>
  );
};
