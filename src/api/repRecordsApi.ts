import { getApp } from "@firebase/app";
import {
  collection,
  getFirestore,
  CollectionReference,
  setDoc,
  doc,
  getDoc,
} from "@firebase/firestore";

import { RepRecords } from "../types/RepRecords";

export async function getRepRecords(userId: string) {
  const snapshot = await getDoc(doc(getRepRecordsCollection(), userId));
  if (snapshot.exists()) {
    return snapshot.data();
  }
  const repRecords: RepRecords = {
    userId,
    records: {
      benchPress: {},
      deadLift: {},
      overheadPress: {},
      squat: {},
    },
  };
  await upsertRepRecords(repRecords);
  return repRecords;
}

export async function upsertRepRecords(repRecords: RepRecords) {
  await setDoc(doc(getRepRecordsCollection(), repRecords.userId), repRecords);
}

function getRepRecordsCollection() {
  return collection(
    getFirestore(getApp()),
    "repRecords"
  ) as CollectionReference<RepRecords>;
}
