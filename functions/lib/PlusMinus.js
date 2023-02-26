"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const bi_1 = require("react-icons/bi");
const react_2 = require("@chakra-ui/react");
const icons_1 = require("@chakra-ui/icons");
const plusMinusQuery_1 = require("./services/plusMinusQuery");
const react_router_dom_1 = require("react-router-dom");
var ACTION;
(function (ACTION) {
    ACTION["RecordAnswer"] = "recordAnswer";
    ACTION["NewQuestion"] = "newQuestion";
    ACTION["GetExistingQuestion"] = "getExistingQuestion";
})(ACTION || (ACTION = {}));
const updateQuestions = (state, action) => {
    switch (action.type) {
        case ACTION.RecordAnswer: {
            const { questionsArray } = state;
            const { index, userInput } = action.payload;
            const updatedQuestionsArray = questionsArray.map((s) => {
                if (s.index === Number(index)) {
                    s.userInput = userInput || null;
                }
                return s;
            });
            const updatedAllCorrect = updatedQuestionsArray
                .map((s) => String(s.answer) === s.userInput)
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
            return Object.assign({}, state);
        }
    }
};
const PlusMinus = () => {
    const [params, setParams] = (0, react_router_dom_1.useSearchParams)();
    const questionId = params.get("questionId");
    const generateQuestions = () => {
        if (questionId !== null) {
            return {
                questionsArray: [],
                allCorrect: false,
            };
        }
        const numberLimit = 20;
        const operators = ["+", "-"];
        const questionCounts = 10;
        const getRandomInt = (max) => Math.floor(Math.random() * (max + 1));
        const questions = [];
        for (let index = 0; index < questionCounts; index++) {
            const firstNumber = getRandomInt(numberLimit);
            const operator = operators[getRandomInt(operators.length - 1)];
            const secondNumber = getRandomInt(operator === "-" ? firstNumber : numberLimit);
            const questionString = `${firstNumber} ${operator} ${secondNumber}`;
            let answer = 0;
            switch (operator) {
                case "+":
                    answer = firstNumber + secondNumber;
                    break;
                case "-":
                    answer = firstNumber - secondNumber;
                    break;
                default:
                    generateQuestions();
                    break;
            }
            const dataForOneQuestion = {
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
    const [state, dispatch] = (0, react_1.useReducer)(updateQuestions, {}, generateQuestions);
    const [questionSaved, setQuestionSaved] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!questionId) {
            return;
        }
        (0, plusMinusQuery_1.useGetQuestions)(questionId)
            .then((questions) => dispatch({
            type: ACTION.GetExistingQuestion,
            payload: {
                questionsArray: questions || null,
            },
        }))
            .catch((error) => console.log(error));
    }, []);
    const inputChangeHandler = (event) => {
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
    const saveQuestionsHandler = (0, react_1.useCallback)((questionId) => {
        const data = state.questionsArray;
        const correctAnswer = state.allCorrect ?
            10 :
            data.filter((q) => String(q.answer) === q.userInput).length;
        setQuestionSaved(true);
        if (questionId === null) {
            (0, plusMinusQuery_1.useSaveNewQuestions)(state.questionsArray, `${correctAnswer} / ${data.length}`)
                .then((id) => setParams({ questionId: id }));
        }
        if (questionId !== null) {
            (0, plusMinusQuery_1.useUpdateQuestions)(state.questionsArray, `${correctAnswer} / ${data.length}`, questionId);
        }
    }, [state]);
    return (react_1.default.createElement(react_2.Container, { centerContent: true }, state.questionsArray.length == 0 ? null : (react_1.default.createElement(react_2.Stack, { direction: "column", gap: "5" },
        react_1.default.createElement(react_2.Button, { colorScheme: "pink", onClick: newQuestionHandler, disabled: !state.allCorrect || !questionSaved }, "New Questions!"),
        react_1.default.createElement(react_2.Button, { colorScheme: "teal", onClick: () => saveQuestionsHandler(questionId) }, "Save"),
        react_1.default.createElement(react_2.TableContainer, null,
            react_1.default.createElement(react_2.Table, { variant: "simple" },
                react_1.default.createElement(react_2.TableCaption, null, "Get all questions right to get new ones."),
                react_1.default.createElement(react_2.Thead, null,
                    react_1.default.createElement(react_2.Tr, null,
                        react_1.default.createElement(react_2.Th, null, "No."),
                        react_1.default.createElement(react_2.Th, null, "Questions"),
                        react_1.default.createElement(react_2.Th, null, "Answer"),
                        react_1.default.createElement(react_2.Th, null, "Result"))),
                react_1.default.createElement(react_2.Tbody, null, state.questionsArray.map((question) => (react_1.default.createElement(react_2.Tr, { key: question.index },
                    react_1.default.createElement(react_2.Td, null, question.index),
                    react_1.default.createElement(react_2.Td, null, question.question),
                    react_1.default.createElement(react_2.Td, null,
                        react_1.default.createElement(react_2.InputGroup, null,
                            react_1.default.createElement(react_2.InputLeftAddon, { children: "=" }),
                            react_1.default.createElement(react_2.NumberInput, { min: 0, variant: "filled", width: "auto", value: question.userInput || "" },
                                react_1.default.createElement(react_2.NumberInputField, { id: String(question.index), name: String(question.index), onChange: () => inputChangeHandler })))),
                    react_1.default.createElement(react_2.Td, null, question.userInput === "" ||
                        question.userInput === null ? (react_1.default.createElement(icons_1.Icon, { as: bi_1.BiRename, w: 6, h: 6, color: "teal.400" })) : question.userInput !== String(question.answer) ? (react_1.default.createElement(icons_1.Icon, { as: bi_1.BiMehAlt, w: 7, h: 7, color: "red.400" })) : (react_1.default.createElement(icons_1.Icon, { as: bi_1.BiLaugh, w: 7, h: 7, color: "pink.400" })))))))))))));
};
exports.default = PlusMinus;
//# sourceMappingURL=PlusMinus.js.map