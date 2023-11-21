import { getApp } from "firebase/app";
import {
  collection,
  query,
  getDocs,
  where,
  getFirestore,
  CollectionReference,
  doc,
  setDoc,
  orderBy,
  limit,
} from "@firebase/firestore";

import { Workout } from "../types/Workout";
import { Exercise } from "../types/Exercise";

export async function createWorkout(
  userId: string,
  workingWeight: { [key in Exercise]: number }
) {
  const workoutRef = doc(getWorkOutCollection());
  const workout: Workout = {
    id: workoutRef.id,
    userId,
    createdTimestamp: Date.now(),
    completedTimestamp: null,
    workingWeight,
    lastSetReps: {
      benchPress: null,
      deadLift: null,
      overheadPress: null,
      squat: null,
    },
  };
  await setDoc(workoutRef, workout);
}

export async function getCurrentWorkout(userId: string) {
  const snapshot = await getDocs(
    query(
      getWorkOutCollection(),
      where("userId", "==", userId),
      orderBy("createdTimestamp", "desc"),
      limit(1)
    )
  );
  if (snapshot.empty) {
    return null;
  }
  return snapshot.docs[0].data();
}

function getWorkOutCollection() {
  return collection(getDb(), "workouts") as CollectionReference<Workout>;
}

function getDb() {
  return getFirestore(getApp());
}
