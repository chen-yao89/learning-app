import React from 'react';
import {Routes, Route} from 'react-router';
import PlusMinus from './PlusMinus';
import NavTabs from './Nav';
import Home from './Home';

import Categories from './categories';
import {bgImgStyle} from './styles/app';
import {ChakraProvider} from '@chakra-ui/react';
import {connectFunctionsEmulator, getFunctions} from '@firebase/functions';
import {app} from './services/firestore';

const App = () => {
  const functions = getFunctions(app);

  if (process.env.REACT_APP_ENV === 'development') {
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }
  return (
    <ChakraProvider cssVarsRoot={undefined}>
      <img src="./rainbowBg.png" style={bgImgStyle} />
      <NavTabs />
      <Routes>
        <Route index element={<Home />} />
        <Route path={Categories.plusMinus} element={<PlusMinus />} />
        <Route
          path={`${Categories.plusMinus}/?questionId=:id`}
          element={<PlusMinus />} />
      </Routes>
    </ChakraProvider>);
};

export default App;
