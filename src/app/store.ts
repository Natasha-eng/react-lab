import { authReducer } from "@/auth-reducer";
import { profileReducer } from "@/components/profile/profile-reducer";
import { filteredGamesReducer } from "@/products/filteredGames-reducer";
import { gamesReducer } from "@/products/games-reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import mySaga from "@/saga/saga";
import { sortedGamesReducer } from "@/products/sortedGames-reducer";
import { cartReducer } from "@/components/cart/cart-reducer";

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  games: gamesReducer,
  filteredGames: filteredGamesReducer,
  auth: authReducer,
  profile: profileReducer,
  sortedGames: sortedGamesReducer,
  cartGames: cartReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(mySaga);
