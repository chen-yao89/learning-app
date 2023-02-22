import { addDoc, getDocs, query, where } from 'firebase/firestore';
import Categories from '../categories';
import { IdData } from '../Home';
import { idList, plusMinus } from './firestore';

export const useGetSavedIds = async (type: Categories): Promise<IdData[]> => {
  const getIdsQuery = query(
    idList,
    where('type', '==', type.toString()),
    where('status', '==', true)
  );
  const querySnapShot = await getDocs(getIdsQuery);
  return querySnapShot.docs.map((doc) => doc.data() as IdData);
};

export const useSaveNewId = async (type: Categories, id: string, note: string) => {
  const dateCreated = new Date();
  await addDoc(plusMinus, {
    id,
    type,
    dateCreated,
    status: true,
    note,
  });
};
