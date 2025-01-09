"use client";
import { getUserFromDB } from "@/lib/appwrite/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  profile: string;
  bio?: string;
  imageUrl?: string;
};

export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  profile: "",
};

type AuthContextType = {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isSignedIn, user: clerkUser } = useUser();

  useEffect(() => {
    const performCheck = async () => {
      try {
        const response = await getUserFromDB();

        const user = response?.documents?.[0]; // Assuming only one user document is returned
        if (!user || !user.onboarded) {
          router.push("/verify");
        } else {
          setUser({
            id: user.$id,
            name: user.name,
            username: user.username,
            email: user.email,
            profile: user.imageProfile,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to check user data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isSignedIn) {
      performCheck();
    } else {
      setIsLoading(false);
    }
  }, [isSignedIn]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useUserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within an AuthProvider");
  }
  return context;
};
