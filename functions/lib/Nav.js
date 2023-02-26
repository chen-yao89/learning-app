"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const categories_1 = __importDefault(require("./categories"));
const react_2 = require("@chakra-ui/react");
const NavTabs = () => {
    const categories = [
        {
            key: categories_1.default.home,
            path: '/',
            name: 'Anthea',
            disabled: false,
        },
        {
            key: categories_1.default.plusMinus,
            name: '+ / -',
            disabled: false,
        },
        {
            key: categories_1.default.tenPlusAny,
            name: '10 + N = ?',
            disabled: true,
        },
        {
            key: categories_1.default.fraction,
            name: '1 / n',
            disabled: true,
        },
    ];
    return (react_1.default.createElement(react_2.Center, { bg: "purple.100", h: "100px", marginBottom: 10 },
        react_1.default.createElement(react_2.ButtonGroup, { gap: "4" }, categories.map((tab) => {
            const path = tab.path || tab.key;
            return tab.disabled === false ? (react_1.default.createElement(react_2.Link, { as: react_router_dom_1.NavLink, to: `${path}`, key: tab.key },
                react_1.default.createElement(react_2.Button, { variant: "solid", colorScheme: "purple", shadow: "xl" }, tab.name))) : null;
        }))));
};
exports.default = NavTabs;
//# sourceMappingURL=Nav.js.map