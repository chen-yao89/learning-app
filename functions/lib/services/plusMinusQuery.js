"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateQuestions = exports.useGetQuestions = exports.useSaveNewQuestions = void 0;
const firestore_1 = require("firebase/firestore");
const categories_1 = __importDefault(require("../categories"));
const firestore_2 = require("./firestore");
const idQuery_1 = require("./idQuery");
const useSaveNewQuestions = async (data, correctRate) => {
    const timeStamp = firestore_1.Timestamp.now();
    const id = JSON.stringify(timeStamp.seconds);
    await (0, firestore_1.setDoc)((0, firestore_1.doc)(firestore_2.plusMinus, id), {
        data,
        correctRate,
    });
    (0, idQuery_1.useSaveNewId)(categories_1.default.plusMinus, id, correctRate);
    return id;
};
exports.useSaveNewQuestions = useSaveNewQuestions;
const useGetQuestions = async (id) => {
    const data = await (0, firestore_1.getDoc)((0, firestore_1.doc)(firestore_2.plusMinus, id));
    if (data.exists()) {
        return data.data();
    }
    throw new Error(`The questions from ${id} seem to be lost...`);
};
exports.useGetQuestions = useGetQuestions;
const useUpdateQuestions = async (data, correctRate, id) => await (0, firestore_1.updateDoc)((0, firestore_1.doc)(firestore_2.plusMinus, id), { data, correctRate });
exports.useUpdateQuestions = useUpdateQuestions;
//# sourceMappingURL=plusMinusQuery.js.map