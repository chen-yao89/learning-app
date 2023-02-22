import React from 'react';
import { Routes, Route } from 'react-router';
import PlusMinus from './PlusMinus';
import NavTabs from './Nav';
import Home from './Home';

import Categories from './categories';
import { bgImgStyle } from './styles/app';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => (
  <ChakraProvider cssVarsRoot={undefined}>
    <img src="./rainbowBg.png" style={bgImgStyle} />
    <NavTabs />
    <Routes>
      <Route index element={<Home />} />
      <Route path={Categories.plusMinus} element={<PlusMinus />} />
      <Route path={`${Categories.plusMinus}/?questionId=:id`} element={<PlusMinus />} />
      {/* <Route path={`/${Categories.tenPlusAny}`} element={<TenPlusAny />} />
        <Route path={`/${Categories.fraction}`} element={<Fraction />} /> */}
    </Routes>
  </ChakraProvider>
);

export default App;
