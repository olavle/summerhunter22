import React from 'react';
import styled from 'styled-components';
import { Home } from './pages/home';
import { GraphqlProvider } from './providers/graphql';
import { GlobalStyles } from './styles/styles';

const StyledApp = styled.main``;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <GraphqlProvider>
        <StyledApp>
          <Home />
        </StyledApp>
      </GraphqlProvider>
    </>
  );
};

export default App;
