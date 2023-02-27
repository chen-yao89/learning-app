"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const PlusMinus_1 = __importDefault(require("./PlusMinus"));
const Nav_1 = __importDefault(require("./Nav"));
const Home_1 = __importDefault(require("./Home"));
const categories_1 = __importDefault(require("./categories"));
const app_1 = require("./styles/app");
const react_2 = require("@chakra-ui/react");
const functions_1 = require("@firebase/functions");
const firestore_1 = require("./services/firestore");
const App = () => {
    const functions = (0, functions_1.getFunctions)(firestore_1.app);
    if (process.env.REACT_APP_ENV === 'development') {
        (0, functions_1.connectFunctionsEmulator)(functions, 'localhost', 5001);
    }
    return (react_1.default.createElement(react_2.ChakraProvider, { cssVarsRoot: undefined },
        react_1.default.createElement("img", { src: "./rainbowBg.png", style: app_1.bgImgStyle }),
        react_1.default.createElement(Nav_1.default, null),
        react_1.default.createElement(react_router_1.Routes, null,
            react_1.default.createElement(react_router_1.Route, { index: true, element: react_1.default.createElement(Home_1.default, null) }),
            react_1.default.createElement(react_router_1.Route, { path: categories_1.default.plusMinus, element: react_1.default.createElement(PlusMinus_1.default, null) }),
            react_1.default.createElement(react_router_1.Route, { path: `${categories_1.default.plusMinus}/?questionId=:id`, element: react_1.default.createElement(PlusMinus_1.default, null) }))));
};
exports.default = App;
//# sourceMappingURL=App.js.map