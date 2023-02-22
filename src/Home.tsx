import React, { useEffect, useReducer } from 'react';
import {
  Center,
  Heading,
  Box,
  VStack,
  StackDivider,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
} from '@chakra-ui/react';
import Categories from './categories';
import { getPlusMinusIds } from '../apiClient';
import { useNavigate } from 'react-router';
import * as FirestoreService from '../apiClient';

type State = Data[];

type Action = {
  type: Categories;
  payload: string[];
};

type Data = {
  id: string;
  date?: string;
};

const dataReducer = (state: State, action: Action) => {
  const newState: State = [];
  switch (action.type) {
    case Categories.plusMinus:
      if (action.payload) {
        action.payload.map((s: string) =>
          newState.push({
            id: s,
            date: new Date(JSON.parse(s) * 1000).toLocaleString(),
          })
        );
      }
      return newState;
    default:
      return [];
  }
};

const titles = [
  {
    id: Categories.plusMinus,
    name: '+ / - review',
  },
  {
    id: Categories.fraction,
    name: '1 / n review',
  },
];

const Home = () => {
  const [state, dispatch] = useReducer(dataReducer, []);
  const navigate = useNavigate();

  const getPlusMinusList = FirestoreService.getList((querySnapshot: { docs: any[] }) => {
    const plusMinusTimeStampList = querySnapshot.docs.map(
      (docSnapshot: { id: string }) => docSnapshot.id
    );
    console.log(plusMinusTimeStampList);
    dispatch({
      type: Categories.plusMinus,
      payload: plusMinusTimeStampList,
    });
  });
  // .then((res) => {
  //     dispatch({
  //     })
  // })
  //         const unsubscribe = FirestoreService.streamGroceryListItems(groceryListId,
  //       (querySnapshot) => {
  //           const updatedGroceryItems =
  //           querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  //           setGroceryItems(updatedGroceryItems);
  //       },
  //       (error) => setError('grocery-list-item-get-fail')
  //   );

  useEffect(() => {
    getPlusMinusList();
  }, []);

  const linkHandler = (id: string, date: string) => {
    navigate(`${id}/?questionId=${date}`);
  };

  const accordionClickHandler = (id: string) => {
    switch (id) {
      case Categories.plusMinus:
        getPlusMinusList();
        break;
      default:
        throw new Error('This category does not exist yet.');
    }
  };

  return (
    <Center>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={10}>
        <Box color="purple.600">
          <Heading>Welcome Anthea!</Heading>
        </Box>
        <Accordion allowToggle defaultIndex={[0]}>
          {titles.map((category) => (
            <AccordionItem key={category.id}>
              <h2>
                <AccordionButton onClick={() => accordionClickHandler(category.id)}>
                  <Box flex="1" textAlign="left">
                    {category.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack bg="purple.50">
                  {state.map((date) => (
                    <Link key={date.id} onClick={() => linkHandler(category.id, date.id)}>
                      {date.date}
                    </Link>
                  ))}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Center>
  );
};

export default Home;
