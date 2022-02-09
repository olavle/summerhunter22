import React from 'react';
import styled from 'styled-components';
import { Login } from './components/Login';
import { Home } from './pages/home';
import { GraphqlProvider } from './providers/graphql';
import { GlobalStyles } from './styles/styles';

const StyledApp = styled.main`
  background-color: #e5fbff;
`;

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
