export type SubscriptionPlan = "free" | "enterprise";

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  subscription: SubscriptionPlan;
  subscribedAt: string | null;
  createdAt: string;
}

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
}

const USERS_KEY = "fraktur-users";
const SESSION_KEY = "fraktur-session";

function hashPassword(email: string, password: string): string {
  return btoa(`${email}:${password}:fraktur-salt`);
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function setSession(session: AuthSession | null) {
  if (session) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

export function getCurrentUser(): StoredUser | null {
  const session = getSession();
  if (!session) return null;
  return readUsers().find((u) => u.id === session.userId) ?? null;
}

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): StoredUser {
  const email = input.email.trim().toLowerCase();
  const users = readUsers();

  if (users.some((u) => u.email === email)) {
    throw new Error("An account with this email already exists.");
  }
  if (input.password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    email,
    name: input.name.trim(),
    passwordHash: hashPassword(email, input.password),
    subscription: "free",
    subscribedAt: null,
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, user]);
  setSession({ userId: user.id, email: user.email, name: user.name });
  return user;
}

export function loginUser(email: string, password: string): StoredUser {
  const normalized = email.trim().toLowerCase();
  const user = readUsers().find((u) => u.email === normalized);

  if (!user || user.passwordHash !== hashPassword(normalized, password)) {
    throw new Error("Invalid email or password.");
  }

  setSession({ userId: user.id, email: user.email, name: user.name });
  return user;
}

export function logoutUser() {
  setSession(null);
}

export function purchaseEnterpriseSubscription(): StoredUser {
  const session = getSession();
  if (!session) throw new Error("You must be logged in to purchase a subscription.");

  const users = readUsers();
  const idx = users.findIndex((u) => u.id === session.userId);
  if (idx === -1) throw new Error("Account not found.");

  const updated: StoredUser = {
    ...users[idx],
    subscription: "enterprise",
    subscribedAt: new Date().toISOString(),
  };
  users[idx] = updated;
  writeUsers(users);
  return updated;
}
