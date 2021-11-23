// eslint-disable-next-line no-use-before-define
import React from "react";
import { AppRootState } from "@/app/storetype";
import { connect } from "react-redux";
import Header from "./header";

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
