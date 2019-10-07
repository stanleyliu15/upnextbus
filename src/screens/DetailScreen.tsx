import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import styled from "styled-components/native";

export default function() {
  return <Map provider={PROVIDER_GOOGLE} />;
}

const Map = styled(MapView)`
  flex: 1;
`;
