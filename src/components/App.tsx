import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { AuthProvider } from "./AuthProvider";
import { AppRouterProvider } from "./AppRouterProvider";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBYwaTqcUzMbf2X13Q2y0KhQKi2gSXP4bk",
  authDomain: "workout-log-9e0e6.firebaseapp.com",
  projectId: "workout-log-9e0e6",
  storageBucket: "workout-log-9e0e6.appspot.com",
  messagingSenderId: "922535398142",
  appId: "1:922535398142:web:9cc99956ea03fdedbf33af",
  measurementId: "G-H8MH0K1235",
});

getAuth(firebaseApp);
getFirestore(firebaseApp);

const theme = createTheme({ headings: { fontWeight: "600" } });
const queryClient = new QueryClient();

export function App() {
  return (
    <AuthProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <QueryClientProvider client={queryClient}>
          <AppRouterProvider />
        </QueryClientProvider>
      </MantineProvider>
    </AuthProvider>
  );
}
