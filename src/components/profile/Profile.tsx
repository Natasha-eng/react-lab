import { AppRootState } from "@/app/storetype";
import { fetchProfileThunkCreator } from "@/thunks/thunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import main from "../../styles/main.module.css";
import { path } from "../header/HeaderContainer";

interface IProfile {
  isSignedIn: boolean;
}

export default function Profile(props: IProfile): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector<AppRootState, string>((state) => state.profile.profile);

  if (!props.isSignedIn) {
    history.push(path.home);
  }

  useEffect(() => {
    dispatch(fetchProfileThunkCreator());
  }, []);

  return <div className={main.container}>{profile}</div>;
}
