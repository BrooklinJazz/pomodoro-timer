import React from "react";
import { Button, View } from "react-native";

export const ResetButton = ({
  reset,
  paused,
}: {
  reset: () => void;
  paused: boolean;
}) => (
  <View style={{ position: "absolute", bottom: "30%" }}>
    {paused && <Button title="Reset" onPress={reset} />}
  </View>
);
