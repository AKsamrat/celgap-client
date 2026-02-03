// Simple authentication utilities
export interface User {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin" | "reviewer";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Mock user data - in production, this would come from a database
const mockUsers: User[] = [
  {
    id: 1,
    email: "admin@legalcenter.org",
    name: "Admin User",
    role: "admin",
  },
  {
    id: 2,
    email: "editor@legalcenter.org",
    name: "Editor User",
    role: "reviewer",
  },
];

// Mock authentication - in production, use proper authentication
export const authenticate = async (
  credentials: LoginCredentials,
): Promise<User | null> => {
  // Simple mock authentication
  if (
    credentials.email === "admin@legalcenter.org" &&
    credentials.password === "admin123"
  ) {
    return mockUsers[0];
  }
  if (
    credentials.email === "editor@legalcenter.org" &&
    credentials.password === "editor123"
  ) {
    return mockUsers[1];
  }
  return null;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (typeof window === "undefined") return;

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
};

export const logout = () => {
  setCurrentUser(null);
};
