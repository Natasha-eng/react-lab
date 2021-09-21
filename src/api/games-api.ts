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

  changePassword(login: string, newPassword: string) {
    return instance.post(`changePassword`, { login, newPassword });
  },
  saveProfile(
    photoFile: string | undefined,
    login: string,
    userName: string,
    email: string,
    profileDescription: string
  ) {
    return instance.post(`saveProfile`, { photoFile, login, userName, email, profileDescription });
  },
};

export default api;
