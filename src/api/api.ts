import { GameType } from "@/types/types";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
});

// api
export const api = {
  getGames() {
    return instance.get<GameType[]>(`home`);
  },
  getGamesByCategory(category: string) {
    return instance.get<GameType[]>(`products/${category}`);
  },
};

export default api;
