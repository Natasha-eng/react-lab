import { AppRootState } from "@/app/storetype";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { changeGameAmountAC, changeGameStatusAC, setMessageAC } from "@/actions/actions";
import { ICart } from "@/types/types";
import { fetchCartThunkCreator, updateCartsThunkCreator } from "@/thunks/thunks";
import cartStyle from "./cart.module.css";
import main from "../../styles/main.module.css";
import ConfirmationModal from "../confirmationModal/confirmationModal";

export default function Cart(): JSX.Element {
  const cartGames = useSelector<AppRootState, ICart[]>((state) => state.cartGames);
  const balance = useSelector<AppRootState, number>((state) => state.profile.profile.balance);
  const message = useSelector<AppRootState, string>((state) => state.systemMessages.message);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setTotal(cartGames.reduce((acc, curr) => acc + curr.price * Number(curr.amount), 0));
  }, [cartGames]);

  useEffect(() => {
    const login = localStorage.getItem("signInLoginValue");
    login && dispatch(fetchCartThunkCreator(login, total));
  }, []);

  useEffect(() => {
    if (cartGames === []) {
      dispatch(setMessageAC("Your cart is empty"));
    } else {
      dispatch(setMessageAC(""));
    }
  }, [cartGames]);

  const changeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeGameAmountAC(e.target.name, e.target.value));
    if (e.target.value) {
      const login = localStorage.getItem("signInLoginValue");
      const updatedCarts = cartGames.map((c) =>
        e.target.dataset.gameid && c.id === +e.target.dataset.gameid ? { ...c, amount: +e.target.value } : c
      );
      login && dispatch(updateCartsThunkCreator(login, updatedCarts));
    }
  };

  const removeCartItem = () => {
    const login = localStorage.getItem("signInLoginValue");
    const updatedcarts = cartGames.filter((g) => !g.checked);
    login && dispatch(updateCartsThunkCreator(login, updatedcarts));
  };

  const buyProduct = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };
  return (
    <div className={main.content}>
      <div className={cartStyle.cartGameContainer}>
        <h2>Cart Page</h2>

        <div className={cartStyle.cartHeaderItems}>
          <div className={cartStyle.cartItem}>Name</div>
          <div className={cartStyle.cartItem}>Platform</div>
          <div className={cartStyle.cartItem}>Order Date</div>
          <div className={cartStyle.cartItem}>Amount</div>
          <div className={cartStyle.cartItem}>Price</div>
        </div>
        {!cartGames && <div>{message}</div>}
        {cartGames.map((g) => {
          const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            const login = localStorage.getItem("signInLoginValue");
            login && dispatch(changeGameStatusAC(g.id, e.target.checked));
          };

          return (
            <div key={g.id} className={cartStyle.cartItems}>
              <div className={cartStyle.cartItem}>{g.name}</div>
              <div className={cartStyle.cartItem}>{g.category}</div>
              <div className={cartStyle.cartItem}>{g.orderDate}</div>
              <div className={cartStyle.cartInputWrapper}>
                <input
                  className={cartStyle.cartInput}
                  type="text"
                  value={g.amount}
                  name={g.name}
                  onChange={changeAmount}
                  data-gameid={g.id}
                />
              </div>

              <div className={cartStyle.cartItem}>{g.price}</div>
              <input
                className={cartStyle.cartCheckbox}
                type="checkbox"
                checked={g.checked}
                onChange={changeStatus}
                value={g.name}
                name={g.name}
              />
            </div>
          );
        })}
        <div className={cartStyle.deleteButton}>
          <button type="button" onClick={removeCartItem}>
            Remove
          </button>
        </div>
        <div className={cartStyle.total}>
          <div>Games cost: {total} $ </div>
          <div>Your balance: {balance} $</div>
          <div className={cartStyle.buyButton}>
            <button type="button" onClick={buyProduct}>
              Buy
            </button>
          </div>
        </div>
      </div>
      {isModal && <ConfirmationModal closeModal={closeModal} total={total} />}
    </div>
  );
}
