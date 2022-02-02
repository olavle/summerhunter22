import React, { FC } from 'react';
import styled from 'styled-components';

const StyledCharacter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > :first-child {
    margin-bottom: 0.5rem;
  }
`;

const Name = styled.div`
  padding: 0rem 3rem;
`;

export interface ICharacterProps {
  name: string;
  characterImage: React.ReactNode;
}

export const Character: FC<ICharacterProps> = ({
  name,
  characterImage,
  ...restProps
}) => {
  return (
    <StyledCharacter {...restProps}>
      <Name>Name: {name}</Name>
      {characterImage}
    </StyledCharacter>
  );
};
