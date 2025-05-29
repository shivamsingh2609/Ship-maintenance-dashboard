import { createContext, useEffect, useContext, useState } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorageUtils";
import { hasPermission } from "../utils/roleUtils";

const AuthContext = createContext();

const USERS = [
  {
    id: "1",
    role: "Admin",
    email: "admin@entnt.in",
    password: "admin123",
    username: "Admin",
  },
  {
    id: "2",
    role: "Inspector",
    email: "inspector@entnt.in",
    password: "inspect123",
    username: "Inspector",
  },
  {
    id: "3",
    role: "Engineer",
    email: "engineer@entnt.in",
    password: "engine123",
    username: "Engineer",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getFromLocalStorage("user") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = getFromLocalStorage("users");
    if (!storedUsers) {
      setToLocalStorage("users", USERS); // Store the USERS array in local storage if not already present
    }
    const loggedInUsers = getFromLocalStorage("loggedInUsers") || [];
    setToLocalStorage("loggedInUsers", loggedInUsers); // Initialize logged-in users if not present
    const storedUser = getFromLocalStorage("user");
    console.log("AuthContext - storedUser:", storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("AuthContext - user role:", user?.role);
  }, [user]);

  const login = (email, password) => {
    const storedUsers = getFromLocalStorage("users") || USERS;
    const foundUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );
    console.log("AuthContext - login foundUser:", foundUser);
    if (foundUser) {
      setUser(foundUser);
      setToLocalStorage("user", foundUser); // Store only the logged-in user

      // Add the user to the logged-in users list
      const loggedInUsers = getFromLocalStorage("loggedInUsers") || [];
      if (!loggedInUsers.some((u) => u.id === foundUser.id)) {
        loggedInUsers.push({
          ...foundUser,
          username: foundUser.username || foundUser.email.split("@")[0], // Fallback to email prefix if username is missing
        });
        setToLocalStorage("loggedInUsers", loggedInUsers);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    const loggedInUsers = getFromLocalStorage("loggedInUsers") || [];
    const updatedLoggedInUsers = loggedInUsers.filter((u) => u.id !== user.id);
    setToLocalStorage("loggedInUsers", updatedLoggedInUsers); // Update the logged-in users list
    setUser(null);
    removeFromLocalStorage("user");
  };

  const checkPermission = (permission) => {
    if (!user || !user.role) return false;
    return hasPermission(user.role, permission);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, checkPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
