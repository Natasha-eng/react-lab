import { GameType, ICart, UserProfileType } from "app/interfcaces/interfaces";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
});

// api
export const api = {
  getGames() {
    return instance.get<GameType[]>(`products`);
  },
  getSortedGames(selectedAge: string, selectedGenre: string, sortCriteria: string, sortType: string) {
    return instance.post<{ games: GameType[]; errorMessage: string }>(`products`, {
      selectedAge,
      selectedGenre,
      sortCriteria,
      sortType,
    });
  },
  getGamesByCategory(category: string) {
    return instance.get<GameType[]>(`products/${category}`);
  },
  getSortedGamesByCategory(
    selectedAge: string,
    selectedGenre: string,
    sortCriteria: string,
    sortType: string,
    category: string
  ) {
    return instance.post<{ games: GameType[]; errorMessage: string }>(`products/${category}`, {
      selectedAge,
      selectedGenre,
      sortCriteria,
      sortType,
    });
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

  getGame(id: number) {
    return instance.get<GameType>(`game/${id}`);
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

  addGame(userName: string, id: number) {
    return instance.post(`addGame`, { userName, id });
  },

  fetchCart(userName: string) {
    return instance.get(`fetchCart`, {
      params: {
        userName,
      },
    });
  },

  updateCart(userName: string, updatedCarts: ICart[]) {
    return instance.post(`updateCart`, {
      userName,
      updatedCarts,
    });
  },

  updateGame(updatedGame: GameType) {
    return instance.post(`updateGame`, {
      updatedGame,
    });
  },

  createGame(newGame: GameType) {
    return instance.post(`createGame`, {
      newGame,
    });
  },

  deleteGame(gameId: number) {
    return instance.delete(`deleteGame`, {
      params: {
        gameId,
      },
    });
  },
};

export default api;
