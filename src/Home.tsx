import React, { useCallback, useEffect, useReducer } from 'react';
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
import { useGetSavedIds } from './services/idQuery';
import { useNavigate } from 'react-router';

type State = IdData[];

type Action = {
  type: Categories;
  payload: IdData[];
};

export type IdData = {
  id: string;
  status: boolean;
  type: Categories;
  note: string;
  dateCreated: Date;
};

const dataReducer = (state: State, action: Action) => {
  switch (action.type) {
    case Categories.plusMinus:
      if (action.payload) {
        return action.payload;
      }
      return [];
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

  const getPlusMinusList = useCallback(
    () =>
      useGetSavedIds(Categories.plusMinus).then((data: IdData[]) => {
        dispatch({
          type: Categories.plusMinus,
          payload: data,
        });
      }),
    []
  );

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
                  {state.map((idData: IdData) => (
                    <Link key={idData.id} onClick={() => linkHandler(category.id, idData.id)}>
                      {`${idData.dateCreated} => ${idData.note}`}
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
