import { changeGameStatusAC, setCartsAC } from "app/actions/actions";
import { ICart } from "app/interfcaces/interfaces";
import { cartReducer } from "./cart-reducer";

let state: ICart[];

beforeEach(() => {
  state = [
    {
      id: 1,
      name: "Apex Legends",
      category: "pc",
      amount: 2,
      orderDate: "2021-09-29T10:20:00Z",
      price: 20,
      checked: false,
    },
  ];
});

test("All the games in cart are desplayed", () => {
  const newCarts = [
    {
      id: 1,
      name: "Apex Legends",
      category: "pc",
      amount: 2,
      orderDate: "2021-09-29T10:20:00Z",
      price: 20,
      checked: false,
    },
    {
      id: 2,
      name: "Rocket League",
      category: "pc",
      amount: 1,
      orderDate: "2021-09-29T10:20:00Z",
      price: 25,
      checked: false,
    },
  ];

  const newState = cartReducer(state, setCartsAC(newCarts));

  expect(newState.length).toBe(2);
});

test("Game changes status", () => {
  const newState = cartReducer(state, changeGameStatusAC(1, true));

  expect(newState[0].checked).toBe(true);
  expect(newState[0].id).toBe(1);
});
