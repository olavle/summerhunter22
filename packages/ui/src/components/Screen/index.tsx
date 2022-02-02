import React, { FC } from 'react';
import styled from 'styled-components';

const StyledScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface IScreenProps {}

export const Screen: FC<IScreenProps> = ({ ...restProps }) => {
  return <StyledScreen {...restProps}></StyledScreen>;
};
