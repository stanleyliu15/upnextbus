import React from "react";
import styled from "styled-components/native";

import { Button, Text } from "../../atoms";
import { space } from "../../../styles";

type SaveButtonProps = {
  onSave: VoidFunction;
};

export const SaveButton = ({ onSave }: SaveButtonProps) => {
  return (
    <Save onPress={onSave}>
      <SaveText center>Save Changes</SaveText>
    </Save>
  );
};

const Save = styled(Button)`
  margin: ${space.xxxLarge};
`;

const SaveText = styled(Text)`
  color: ${({ theme }) => theme.white};
`;
