"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSaveNewId = exports.useGetSavedIds = void 0;
const firestore_1 = require("firebase/firestore");
const firestore_2 = require("./firestore");
const useGetSavedIds = async (type) => {
    const getIdsQuery = (0, firestore_1.query)(firestore_2.idList, (0, firestore_1.where)('type', '==', type.toString()), (0, firestore_1.where)('status', '==', true));
    const querySnapShot = await (0, firestore_1.getDocs)(getIdsQuery);
    return querySnapShot.docs.map((doc) => doc.data());
};
exports.useGetSavedIds = useGetSavedIds;
const useSaveNewId = async (type, id, note) => {
    const dateCreated = new Date();
    await (0, firestore_1.addDoc)(firestore_2.plusMinus, {
        id,
        type,
        dateCreated,
        status: true,
        note,
    });
};
exports.useSaveNewId = useSaveNewId;
//# sourceMappingURL=idQuery.js.map