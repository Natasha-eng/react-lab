export const errorLogin =
  "Your login is not valid. Only characters A-Z, a-z, numbers 0-9 are  acceptable. Login can be at least 2 charecters long and no more than 20 characters";
export const errorPassword =
  "Password must be a minimum of 5 characters including at least one number and at least one special character and not more than 10 characters";
export const commonError = "All the fields are required";

export const errorRepeatPassword = "Passwords don't match";

export const userNameError =
  "Your login is not valid. Only characters A-Z, a-z, numbers 0-9 are  acceptable. Login can be at least 2 charecters long and no more than 20 characters";
export const emailError = "Valid email formats are: mysite@ourearth.com / my.ownsite@ourearth.org / mysite@you.me.net";
export const textareaError = `Please input between 10 and 100 characters`;

export const path = {
  home: "/home",
  products: "/products/:category?",
  about: "/about",
  profile: "/profile/:loggedInUser",
};

export const Types = {
  SET_USER_NAME: "SET-USER-NAME",
  SET_USER_PROFILE: "SET-USER-PROFILE",
  CHANGE_PASSWORD: "CHANGE-PASSWORD",
  SAVE_PROFILE: "SAVE-PROFILE",
  SET_FILTERED_GAMES: "SET-FILTERED-GAMES",
  CLEAR_GAMES: "CLEAR-GAMES",
  IS_FETCHING_GAMES: "IS-FETCHING-GAMES",
  SET_GAMES: "SET-GAMES",
  IS_SIGNED_IN: "IS-SIGNED-IN",
  SET_ERROR: "SET-ERROR",
  SIGN_IN: "SIGN-IN",
};
