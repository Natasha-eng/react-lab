import { authReducer } from "@/auth-reducer";
import { profileReducer } from "@/components/profile/profile-reducer";
import { filteredGamesReducer } from "@/products/filteredGames-reducer";
import { gamesReducer } from "@/products/games-reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import mySaga from "@/saga/saga";

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  games: gamesReducer,
  filteredGames: filteredGamesReducer,
  auth: authReducer,
  profile: profileReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(mySaga);
