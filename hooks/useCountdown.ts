import { useState } from "react";
import { useInterval } from "./useInterval";
import moment from "moment";

export const useCountdown = ({
  m = 0,
  s = 0,
  h = 0,
}: {
  m?: number;
  s?: number;
  h?: number;
}) => {
    if (!m && !s && !h) {
        throw Error("useCountdown use be provided an input")
    }
  const intervalInMs = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;
  const [count, setCount] = useState(0);
  const diff = intervalInMs - count;
  const remainingDuration = moment.duration(diff, "milliseconds");
  const remainingMilliseconds = remainingDuration.asMilliseconds();

  const [started, setStart] = useState(false);

  useInterval(() => {
    if (started && remainingMilliseconds !== 0) {
      setCount(count + 1000);
    }
  }, 1000);

  return {
    time: moment.utc(remainingMilliseconds),
    start: () => setStart(true),
  };
};
