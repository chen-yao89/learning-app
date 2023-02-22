import React, { useReducer, useEffect, useState } from 'react';
import { BiLaugh, BiMehAlt, BiRename } from 'react-icons/bi';
import {
  Container,
  Button,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import {
  useSaveNewQuestions,
  useGetQuestions,
  useUpdateQuestions,
} from './services/plusMinusQuery';
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

type StateType =
  | {
      questionsArray: QuestionType[];
      allCorrect: boolean;
    }
  | Record<string, never>;

export type QuestionType = {
  index: number;
  question: string;
  answer: number;
  userInput: string | null;
};

type ActionType = {
  type: ACTION;
  payload: {
    questionsArray?: QuestionType[] | null;
    allCorrect?: boolean;
    index?: number;
    userInput?: string | null;
  };
};

enum ACTION {
  RecordAnswer = 'recordAnswer',
  NewQuestion = 'newQuestion',
  GetExistingQuestion = 'getExistingQuestion',
}

const updateQuestions = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case ACTION.RecordAnswer: {
      const { questionsArray } = state;
      const { index, userInput } = action.payload;
      const updatedQuestionsArray = questionsArray.map((s: QuestionType) => {
        if (s.index === Number(index)) {
          s.userInput = userInput || null;
        }
        return s;
      });
      const updatedAllCorrect = updatedQuestionsArray
        .map((s: QuestionType) => String(s.answer) === s.userInput)
        .includes(false);
      return {
        questionsArray: updatedQuestionsArray,
        allCorrect: !updatedAllCorrect,
      };
    }
    case ACTION.NewQuestion: {
      return {
        questionsArray: action.payload.questionsArray || [],
        allCorrect: false,
      };
    }
    case ACTION.GetExistingQuestion: {
      return {
        questionsArray: action.payload.questionsArray || [],
        allCorrect: action.payload.allCorrect || false,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const PlusMinus = () => {
  const [params, setParams] = useSearchParams();
  const questionId = params.get('questionId');

  const generateQuestions = (): StateType => {
    if (questionId !== null) {
      return {
        questionsArray: [],
        allCorrect: false,
      };
    }

    const numberLimit = 20;
    const operators = ['+', '-'];
    const questionCounts = 10;

    const getRandomInt = (max: number) => Math.floor(Math.random() * (max + 1));
    const questions: QuestionType[] = [];
    for (let index = 0; index < questionCounts; index++) {
      const firstNumber = getRandomInt(numberLimit);
      const operator = operators[getRandomInt(operators.length - 1)];
      const secondNumber = operator === '-' ? getRandomInt(firstNumber) : getRandomInt(numberLimit);

      const questionString = `${firstNumber} ${operator} ${secondNumber}`;
      let answer = 0;
      switch (operator) {
        case '+':
          answer = firstNumber + secondNumber;
          break;
        case '-':
          answer = firstNumber - secondNumber;
          break;
        default:
          generateQuestions();
          break;
      }

      const dataForOneQuestion: QuestionType = {
        index: index + 1,
        question: questionString,
        answer: answer,
        userInput: null,
      };
      questions.push(dataForOneQuestion);
    }
    return {
      questionsArray: questions,
      allCorrect: false,
    };
  };

  const [state, dispatch] = useReducer(updateQuestions, {}, generateQuestions);
  const [questionSaved, setQuestionSaved] = useState(false);

  useEffect(() => {
    if (!questionId) {
      return;
    }
    useGetQuestions(questionId)
      .then((questions) =>
        dispatch({
          type: ACTION.GetExistingQuestion,
          payload: {
            questionsArray: questions || null,
          },
        })
      )
      .catch((error) => console.log(error));
  }, []);

  const inputChangeHandler = (event: { target: { id: number; value: string } }) => {
    const index = event.target.id;
    const userInput = event.target.value;
    // document.getElementById(index). = userInput;
    dispatch({
      type: ACTION.RecordAnswer,
      payload: {
        index,
        userInput,
      },
    });
  };

  const newQuestionHandler = () => {
    dispatch({
      type: ACTION.NewQuestion,
      payload: generateQuestions(),
    });
  };

  const saveQuestionsHandler = useCallback(
    (questionId: string | null) => {
      const data = state.questionsArray;
      const correctAnswer = state.allCorrect
        ? 10
        : data.filter((q) => String(q.answer) === q.userInput).length;
      setQuestionSaved(true);
      if (questionId === null) {
        useSaveNewQuestions(state.questionsArray, `${correctAnswer} / ${data.length}`).then((id) =>
          setParams({ questionId: id })
        );
      }
      if (questionId !== null) {
        useUpdateQuestions(state.questionsArray, `${correctAnswer} / ${data.length}`, questionId);
      }
    },
    [state]
  );

  return (
    <Container centerContent>
      {state.questionsArray.length == 0 ? null : (
        <Stack direction="column" gap="5">
          <Button
            colorScheme="pink"
            onClick={newQuestionHandler}
            disabled={!state.allCorrect || !questionSaved}
          >
            New Questions!
          </Button>
          <Button colorScheme="teal" onClick={() => saveQuestionsHandler(questionId)}>
            Save
          </Button>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Get all questions right to get new ones.</TableCaption>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Questions</Th>
                  <Th>Answer</Th>
                  <Th>Result</Th>
                </Tr>
              </Thead>
              <Tbody>
                {state.questionsArray.map((question: QuestionType) => (
                  <Tr key={question.index}>
                    <Td>{question.index}</Td>
                    <Td>{question.question}</Td>
                    <Td>
                      <InputGroup>
                        {/* eslint-disable-next-line react/no-children-prop */}
                        <InputLeftAddon children="=" />
                        <NumberInput
                          min={0}
                          variant="filled"
                          width="auto"
                          value={question.userInput || ''}
                        >
                          <NumberInputField
                            id={String(question.index)}
                            name={String(question.index)}
                            onChange={() => inputChangeHandler}
                          />
                        </NumberInput>
                      </InputGroup>
                    </Td>
                    <Td>
                      {question.userInput === '' || question.userInput === null ? (
                        <Icon as={BiRename} w={6} h={6} color="teal.400" />
                      ) : question.userInput !== String(question.answer) ? (
                        <Icon as={BiMehAlt} w={7} h={7} color="red.400" />
                      ) : (
                        <Icon as={BiLaugh} w={7} h={7} color="pink.400" />
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Container>
  );
};

export default PlusMinus;
