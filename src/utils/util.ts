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

export const isEmailValid = (email: string) => {
  const regularExpression = /^\w+([.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const validEmail = email.match(regularExpression);
  return validEmail;
};

export const lengthRange = (value: string) => {
  const userInput = value;
  if (userInput.length >= 10 && userInput.length <= 100) {
    return true;
  }
  return false;
};

export const convertToBase64 = (file: File) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      res(reader.result);
    };
    reader.onerror = () => {
      rej(console.log("file loading error "));
    };
  });
