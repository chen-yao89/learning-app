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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_2 = require("@chakra-ui/react");
const categories_1 = __importDefault(require("./categories"));
const idQuery_1 = require("./services/idQuery");
const react_router_1 = require("react-router");
const dataReducer = (state, action) => {
    switch (action.type) {
        case categories_1.default.plusMinus:
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
        id: categories_1.default.plusMinus,
        name: "+ / - review",
    },
    {
        id: categories_1.default.fraction,
        name: "1 / n review",
    },
];
const Home = () => {
    const [state, dispatch] = (0, react_1.useReducer)(dataReducer, []);
    const navigate = (0, react_router_1.useNavigate)();
    const getPlusMinusList = (0, react_1.useCallback)(() => (0, idQuery_1.useGetSavedIds)(categories_1.default.plusMinus).then((data) => {
        dispatch({
            type: categories_1.default.plusMinus,
            payload: data,
        });
    }), []);
    (0, react_1.useEffect)(() => {
        getPlusMinusList();
    }, []);
    const linkHandler = (id, date) => {
        navigate(`${id}/?questionId=${date}`);
    };
    const accordionClickHandler = (id) => {
        switch (id) {
            case categories_1.default.plusMinus:
                getPlusMinusList();
                break;
            default:
                throw new Error("This category does not exist yet.");
        }
    };
    return (react_1.default.createElement(react_2.Center, null,
        react_1.default.createElement(react_2.VStack, { divider: react_1.default.createElement(react_2.StackDivider, { borderColor: "gray.200" }), spacing: 10 },
            react_1.default.createElement(react_2.Box, { color: "purple.600" },
                react_1.default.createElement(react_2.Heading, null, "Welcome Anthea!")),
            react_1.default.createElement(react_2.Accordion, { allowToggle: true, defaultIndex: [0] }, titles.map((category) => (react_1.default.createElement(react_2.AccordionItem, { key: category.id },
                react_1.default.createElement("h2", null,
                    react_1.default.createElement(react_2.AccordionButton, { onClick: () => accordionClickHandler(category.id) },
                        react_1.default.createElement(react_2.Box, { flex: "1", textAlign: "left" }, category.name),
                        react_1.default.createElement(react_2.AccordionIcon, null))),
                react_1.default.createElement(react_2.AccordionPanel, { pb: 4 },
                    react_1.default.createElement(react_2.Stack, { bg: "purple.50" }, state.map((idData) => (react_1.default.createElement(react_2.Link, { key: idData.id, onClick: () => linkHandler(category.id, idData.id) }, `${idData.dateCreated} => ${idData.note}`))))))))))));
};
exports.default = Home;
//# sourceMappingURL=Home.js.map