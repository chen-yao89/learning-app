import {doc, getDoc, setDoc, Timestamp, updateDoc} from "firebase/firestore";
import Categories from "../categories";
import {QuestionType} from "../PlusMinus";
import {plusMinus} from "./firestore";
import {useSaveNewId} from "./idQuery";

export const useSaveNewQuestions =
async (data: QuestionType[], correctRate: string) => {
  const timeStamp = Timestamp.now();
  const id = JSON.stringify(timeStamp.seconds);
  await setDoc(doc(plusMinus, id), {
    data,
    correctRate,
  });
  useSaveNewId(Categories.plusMinus, id, correctRate);
  return id;
};

export const useGetQuestions = async (id: string): Promise<QuestionType[]> => {
  const data = await getDoc(doc(plusMinus, id));
  if (data.exists()) {
    return data.data() as QuestionType[];
  }
  throw new Error(`The questions from ${id} seem to be lost...`);
};

export const useUpdateQuestions =
async (data: QuestionType[], correctRate: string, id: string) =>
  await updateDoc(doc(plusMinus, id), {data, correctRate});
