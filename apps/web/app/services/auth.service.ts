import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  token?: string;
}

export const authService = {
  async login(data: LoginData): Promise<UserData> {
    const response = await api.post("/auth/login", data);
    if (response.data.token && typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterData): Promise<UserData> {
    const response = await api.post("/auth/register", data);
    if (response.data.token && typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  async getProfile(): Promise<UserData> {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
};
