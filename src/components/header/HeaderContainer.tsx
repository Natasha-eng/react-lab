import { AppRootState } from "@/app/storetype";
import React from "react";
import { connect } from "react-redux";
import Header from "./header";

export const path = {
  home: "/home",
  products: "/products/:category?",
  about: "/about",
  profile: "/profile",
};

type mapStateToProps = {
  isSignedIn: boolean;
  userName: string;
};

class HeaderContainer extends React.Component<mapStateToProps> {
  render() {
    return <Header isSignedIn={this.props.isSignedIn} userName={this.props.userName} />;
  }
}

const mapStateToProps = (state: AppRootState) => ({
  isSignedIn: state.auth.isSignedIn,
  userName: state.profile.userName,
});

export default connect(mapStateToProps)(HeaderContainer);
