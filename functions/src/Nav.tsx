import React from 'react';
import {NavLink as ReachLink} from 'react-router-dom';
import Categories from './categories';

import {Link, Button, ButtonGroup, Center} from '@chakra-ui/react';

const NavTabs = () => {
  const categories = [
    {
      key: Categories.home,
      path: '/',
      name: 'Anthea',
      disabled: false,
    },
    {
      key: Categories.plusMinus,
      name: '+ / -',
      disabled: false,
    },
    {
      key: Categories.tenPlusAny,
      name: '10 + N = ?',
      disabled: true,
    },
    {
      key: Categories.fraction,
      name: '1 / n',
      disabled: true,
    },
  ];

  return (
    <Center bg="purple.100" h="100px" marginBottom={10}>
      <ButtonGroup gap="4">
        {categories.map((tab) => {
          const path = tab.path || tab.key;
          return tab.disabled === false ? (
            <Link as={ReachLink} to={`${path}`} key={tab.key}>
              <Button variant="solid" colorScheme="purple" shadow="xl">
                {tab.name}
              </Button>
            </Link>
          ) : null;
        })}
      </ButtonGroup>
    </Center>
  );
};

export default NavTabs;
