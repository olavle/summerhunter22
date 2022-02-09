import styled from 'styled-components';
import React, { useState } from 'react';
import { Burger } from '../../assets';

const ActionMenu = styled.div`
  position: absolute;
  margin-left: 454px;
`;

const ActionItem = styled.div`
  cursor: pointer;
`;

interface IProps {
  eat: () => void;
  sleep: () => void;
  play: () => void;
}

export const CharacterActions: React.FC<IProps> = ({ eat, sleep, play }) => {
  return (
    <ActionMenu>
      <ActionItem onClick={eat}>Eat</ActionItem>
      <ActionItem onClick={sleep}>Sleep</ActionItem>
      <ActionItem onClick={play}>Play</ActionItem>
    </ActionMenu>
  );
};
