import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import type { ImageSource } from "expo-image";

// YOUR PROFILE: change these to change the name and picture shown in the app.
const PROFILE_NAME = "Remiel Ucat";
const PROFILE_USERNAME = "remielucat";
const PROFILE_AVATAR: ImageSource = require("@/assets/images/avatars/remiel.jpg");

export type User = {
  name: string;
  avatar?: ImageSource;
  username: string;
  email: string;
  location: string;
  bio: string;
  joinedAt: string;
};

export type ProfileFields = Pick<User, "name" | "username" | "location" | "bio">;

type UserValue = {
  user: User | null;
  /** No API yet: builds the user from what was typed. */
  register: (name: string, email: string) => void;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (fields: ProfileFields) => void;
};

const UserContext = createContext<UserValue | null>(null);

const nameFromEmail = (email: string) =>
  email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const makeUser = (_name: string, email: string): User => ({
  name: PROFILE_NAME,
  username: PROFILE_USERNAME,
  avatar: PROFILE_AVATAR,
  email: email.trim(),
  location: "",
  bio: "",
  joinedAt: new Date().toISOString(),
});

/** Keeps the signed-in user in memory so every screen shows the same person. */
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const register = useCallback((name: string, email: string) => setUser(makeUser(name, email)), []);

  const login = useCallback(
    (email: string) =>
      setUser((prev) =>
        prev && prev.email.toLowerCase() === email.trim().toLowerCase()
          ? prev
          : makeUser(nameFromEmail(email.trim()) || "New User", email)
      ),
    []
  );

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback(
    (fields: ProfileFields) =>
      setUser((prev) =>
        prev
          ? { ...prev, name: fields.name.trim(), username: fields.username.trim(), location: fields.location.trim(), bio: fields.bio.trim() }
          : prev
      ),
    []
  );

  const value = useMemo(() => ({ user, register, login, logout, updateProfile }), [user, register, login, logout, updateProfile]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}
