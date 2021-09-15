import { authReducer } from "@/auth-reducer";
import { profileReducer } from "@/components/profile/profile-reducer";
import { filteredGamesReducer } from "@/products/filteredGames-reducer";
import { gamesReducer } from "@/products/games-reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  games: gamesReducer,
  filteredGames: filteredGamesReducer,
  auth: authReducer,
  profile: profileReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
