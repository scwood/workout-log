import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthContext {
  userId: string | null;
  displayName: string | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (provider: "google" | "github") => void;
  signOut: () => void;
}

const authContext = createContext<AuthContext | null>(null);

export interface AuthProviderProps {
  children?: JSX.Element;
}

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    return getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setDisplayName(user.displayName);
      } else {
        setUserId(null);
        setDisplayName(null);
      }
      setIsLoading(false);
    });
  }, []);

  const signIn = useCallback(async (provider: "google" | "github") => {
    try {
      provider === "github"
        ? await signInWithGitHub()
        : await signInWithGoogle();
      setError(null);
    } catch (error) {
      setError(error as Error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await getAuth().signOut();
      setError(null);
    } catch (error) {
      setError(error as Error);
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        isLoading,
        error,
        userId,
        displayName,
        signIn,
        signOut,
      }}
    >
      {isLoading ? null : children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}

function signInWithGoogle() {
  return signInWithPopup(getAuth(), new GoogleAuthProvider());
}

function signInWithGitHub() {
  return signInWithPopup(getAuth(), new GithubAuthProvider());
}
