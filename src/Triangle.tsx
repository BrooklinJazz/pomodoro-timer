import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components/native";

export const Triangle = styled(Svg).attrs(() => ({
  children: <Path d="M 3.5 0 L 0 7 L 7 7 z" fill="#248f24" />
}))`
  position: absolute;
  margin-left: -3.5px;
  height: 7px;
  width: 7px;
`;
