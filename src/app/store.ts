import { filteredGamesReducer } from "@/products/filteredGames-reducer";
import { gamesReducer } from "@/products/games-reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  games: gamesReducer,
  filteredGames: filteredGamesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
