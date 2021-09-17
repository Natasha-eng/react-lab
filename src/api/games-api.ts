import { GameType, UserProfileType } from "@/types/types";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
});

// api
export const api = {
  getGames() {
    return instance.get<GameType[]>(`products`);
  },
  getGamesByCategory(category: string) {
    return instance.get<GameType[]>(`products/${category}`);
  },
  getGamesByDate() {
    return instance.get<GameType[]>(`home/getTopProducts`);
  },
  getGamesByName(name: string) {
    return instance.get<GameType[]>(`home/search`, {
      params: {
        name,
      },
    });
  },
  signUp(login: string, password: string) {
    return instance.post(`auth/signUp`, { login, password });
  },
  signIn(login: string, password: string) {
    return instance.post(`auth/signIn`, { login, password });
  },

  getProfile(loggedInUser: string) {
    return instance.get<UserProfileType>(`profile/${loggedInUser}`);
  },

  changePassword(oldPassword: string, newPassword: string) {
    return instance.post(`changePassword`, { oldPassword, newPassword });
  },
  saveProfile(password: string, userName: string, email: string, profileDescription: string) {
    return instance.post(`saveProfile`, { password, userName, email, profileDescription });
  },
};

export default api;
