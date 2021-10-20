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
  cart: "/cart",
};

export const genre = {
  all: "all",
  allGenres: "allGenres",
  shooter: "Shooter",
  arcade: "Arcade",
  survive: "Survive",
};

export const age = {
  all: "all",
  age3: "3+",
  age6: "6+",
  age12: "12+",
  age18: "18+",
};

export const criteria = {
  name: "name",
  price: "price",
  ascending: "ascending",
  descending: "descending",
};
