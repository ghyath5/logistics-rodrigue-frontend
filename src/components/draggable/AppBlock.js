import * as React from "react";
import styled from "styled-components";

import { Stack, Text } from "../../utils/styled";

const Block = styled(Stack)`
  position: relative;
  border-radius: 4px;
  margin-right: 8px;
`;

const StyledText = styled(Text)`
  color: white;
  font-weight: 600;
  font-size: 24px;
  user-select: none;
`;

const QucikPick = ({ name, ...props }) => {
  return (
    <Block
      className="app-block"
      {...props}
      alignItems="center"
      justifyContent="center"
    >
      <StyledText className="ellipsis">{name}</StyledText>
    </Block>
  );
};

export default QucikPick;
