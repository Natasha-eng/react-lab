export const isLoginValide = (login: string) => {
  const nameRegex = /^[a-zA-Z0-9!@#$%^&*]{5,10}$/;
  const validLoginName = login.match(nameRegex);
  return validLoginName;
};

export const isPasswordValide = (value: string) => {
  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,10}$/;
  const validPassword = value.match(regularExpression);
  return validPassword;
};
