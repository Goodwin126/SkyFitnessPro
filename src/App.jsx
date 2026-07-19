import { AppRoutes } from './routes';
import { GlobalStyles, Wrapper, MainContent } from './appLayout/styles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <MainContent>
          <AppRoutes />
        </MainContent>
      </Wrapper>
    </>
  );
}

export default App;
