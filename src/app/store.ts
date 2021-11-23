import { profileReducer } from "@/components/profile/profile-reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import mySaga from "@/saga/saga";
import { cartReducer } from "app/components/cart/reducer/cart-reducer";
import { systemMessagesReducer } from "@/systemMessages/systemMessages-reducer";
import { gamesReducer } from "app/components/products/reducers/games-reducer";
import { filteredGamesReducer } from "app/components/products/reducers/filteredGames-reducer";
import { sortedGamesReducer } from "app/components/products/reducers/sortedGames-reducer";
import { gameReducer } from "app/components/products/reducers/game-reducer";
import { authReducer } from "app/auth/reducer/auth-reducer";

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  games: gamesReducer,
  filteredGames: filteredGamesReducer,
  auth: authReducer,
  profile: profileReducer,
  sortedGames: sortedGamesReducer,
  cartGames: cartReducer,
  systemMessages: systemMessagesReducer,
  game: gameReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(mySaga);
