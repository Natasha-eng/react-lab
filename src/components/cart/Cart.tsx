// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useCallback, useState } from "react";
import { AppRootState } from "@/app/storetype";
import { useDispatch, useSelector } from "react-redux";
import { changeGameAmountAC, changeGameStatusAC, setMessageAC } from "@/actions/actions";
import { ICart } from "app/interfcaces/interfaces";
import { updateCartsThunkCreator } from "@/thunks/thunks";
import cartStyle from "./css/cart.module.css";
import mainStyles from "../../styles/main.module.css";
import main from "../../styles/main.module.css";
import ConfirmationModal from "../confirmationModal/confirmationModal";

interface Props {
  total: number;
}

const Cart = React.memo(({ total }: Props): JSX.Element => {
  const cartGames = useSelector<AppRootState, ICart[]>((state) => state.cartGames);
  const balance = useSelector<AppRootState, number>((state) => state.profile.profile.balance);
  const message = useSelector<AppRootState, string>((state) => state.systemMessages.message);
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);

  const changeAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeGameAmountAC(e.target.name, e.target.value));
      if (e.target.value) {
        const login = localStorage.getItem("signInLoginValue");
        const updatedCarts = cartGames.map((c) =>
          e.target.dataset.gameid && c.id === +e.target.dataset.gameid ? { ...c, amount: +e.target.value } : c
        );

        login && dispatch(updateCartsThunkCreator(login, updatedCarts));
      }
    },
    [cartGames, dispatch]
  );

  const removeCartItem = useCallback(() => {
    const login = localStorage.getItem("signInLoginValue");
    const updatedcarts = cartGames.filter((g) => !g.checked);
    login && dispatch(updateCartsThunkCreator(login, updatedcarts));
    console.log("updatedcarts", updatedcarts);

    if (updatedcarts.length === 0) {
      dispatch(setMessageAC("Your cart is empty"));
    } else {
      dispatch(setMessageAC(""));
    }
  }, [dispatch, cartGames]);

  const buyProduct = useCallback(() => {
    setIsModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModal(false);
  }, []);

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
        {cartGames.length === 0 ? (
          <div className={cartStyle.cartItems}>
            <div className={cartStyle.message}>{message}</div>
          </div>
        ) : (
          cartGames.map((g) => {
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
              const login = localStorage.getItem("signInLoginValue");
              login && dispatch(changeGameStatusAC(g.id, e.target.checked));
            };

            return (
              <div key={g.id} className={cartStyle.cartItems}>
                <div className={cartStyle.cartItem}>
                  <div className={cartStyle.cartItemMobile}>Name</div>
                  <div>{g.name}</div>
                </div>

                <div className={cartStyle.cartItem}>
                  <div className={cartStyle.cartItemMobile}>Platform</div>
                  <div>{g.category}</div>
                </div>

                <div className={cartStyle.cartItem}>
                  <div className={cartStyle.cartItemMobile}>Order Date</div>
                  <div>{g.orderDate}</div>
                </div>

                <div className={cartStyle.cartItem}>
                  <div className={cartStyle.cartItemMobile}>Amount</div>
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
                </div>

                <div className={cartStyle.cartItem}>
                  <div className={cartStyle.cartItemMobile}>Price</div>
                  <div>{g.price}</div>
                </div>

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
          })
        )}
        <div className={cartStyle.deleteButton}>
          <button type="button" onClick={removeCartItem}>
            Remove
          </button>
        </div>
        <div className={cartStyle.total}>
          <div>Games cost: {total.toPrecision(3)} $ </div>
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
});

export default Cart;
