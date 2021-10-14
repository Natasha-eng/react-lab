import { AppRootState } from "@/app/storetype";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { changeGameAmountAC, changeGameStatusAC, removeGameAC } from "@/actions/actions";
import { CartGameType } from "@/types/types";
import cartStyle from "./cart.module.css";
import main from "../../styles/main.module.css";
import ConfirmationModal from "../confirmationModal/confirmationModal";

export default function Cart(): JSX.Element {
  const cartGames = useSelector<AppRootState, CartGameType[]>((state) => state.cartGames);
  const [checkedGame, setCheckedGame] = useState(false);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => setTotal(cartGames.reduce((acc, curr) => acc + curr.price * Number(curr.amount), 0)), [cartGames]);
  const changeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeGameAmountAC(e.target.name, e.target.value));
  };

  const removeItem = () => {
    dispatch(removeGameAC(checkedGame));
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
        {cartGames.map((g) => {
          const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeGameStatusAC(e.target.value, e.target.checked));
            setCheckedGame(g.checked);
          };

          return (
            <div key={g.game.id} className={cartStyle.cartItems}>
              <div className={cartStyle.cartItem}>{g.game.name}</div>
              <div className={cartStyle.cartItem}>{g.game.category}</div>
              <div className={cartStyle.cartItem}>{g.orderDate}</div>
              <div className={cartStyle.cartInputWrapper}>
                <input
                  className={cartStyle.cartInput}
                  type="text"
                  value={g.game.amount}
                  name={g.game.name}
                  onChange={changeAmount}
                />
              </div>

              <div className={cartStyle.cartItem}>{g.game.price}</div>
              <input
                className={cartStyle.cartCheckbox}
                type="checkbox"
                checked={g.checked}
                onChange={changeStatus}
                value={g.game.name}
                name={g.game.name}
              />
            </div>
          );
        })}
        <div className={cartStyle.deleteButton}>
          <button type="button" onClick={removeItem}>
            Remove
          </button>
        </div>
        <div className={cartStyle.total}>
          <div>Games cost: {total} $ </div>
          <div>Your balance: 32.98 $</div>
          <div className={cartStyle.buyButton}>
            <button type="button" onClick={buyProduct}>
              Buy
            </button>
          </div>
        </div>
      </div>
      {isModal && <ConfirmationModal closeModal={closeModal} />}
    </div>
  );
}
