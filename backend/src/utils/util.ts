import { Response } from "express";
import { IGame } from "../writeJsonToFile";

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

export const sortedGames = (
  selectedAge: string,
  selectedGenre: string,
  sortCriteria: string,
  sortType: string,
  games: IGame[],
  res: Response
) => {
  let filteredGames: IGame[] = [] as IGame[];

  if (selectedAge === "all" && selectedGenre === "all") {
    if (sortCriteria === "name") {
      if (sortType === "ascending") {
        games.sort((a: IGame, b: IGame) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      } else {
        games.sort((a: IGame, b: IGame) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
    }

    if (sortCriteria === "price") {
      if (sortType === "ascending") {
        games.sort((a: IGame, b: IGame) => a.price - b.price);
      } else {
        games.sort((a: IGame, b: IGame) => b.price - a.price);
      }
    }
    res.status(200).send({ games });
    if (!games) {
      res.status(500).send({ errorMessage: "There are no games with such parameters" });
    }
  }
  if (selectedAge !== "all" && selectedGenre !== "all") {
    filteredGames = games.filter((g: IGame) => g.allowedAge === selectedAge && g.genre === selectedGenre);
    if (sortCriteria === "name") {
      if (sortType === "ascending") {
        filteredGames.sort((a: IGame, b: IGame) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      } else {
        filteredGames.sort((a: IGame, b: IGame) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
    }
    if (sortCriteria === "price") {
      if (sortType === "ascending") {
        filteredGames.sort((a: IGame, b: IGame) => a.price - b.price);
      } else {
        filteredGames.sort((a: IGame, b: IGame) => b.price - a.price);
      }
    }
    res.status(200).send({ games: filteredGames });
    if (!filteredGames) {
      res.status(500).send({ errorMessage: "There are no games with such parameters" });
    }
  }
  if (selectedAge !== "all" && selectedGenre === "all") {
    filteredGames = games.filter((g: IGame) => g.allowedAge === selectedAge);
    if (sortCriteria === "name") {
      if (sortType === "ascending") {
        filteredGames.sort((a: IGame, b: IGame) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      } else {
        filteredGames.sort((a: IGame, b: IGame) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
    }
    if (sortCriteria === "price") {
      if (sortType === "ascending") {
        filteredGames.sort((a: IGame, b: IGame) => a.price - b.price);
      } else {
        filteredGames.sort((a: IGame, b: IGame) => b.price - a.price);
      }
    }
    res.status(200).send({ games: filteredGames });
    if (!filteredGames) {
      res.status(500).send({ errorMessage: "There are no games with such parameters" });
    }
  }
  if (selectedGenre !== "all" && selectedAge === "all") {
    filteredGames = games.filter((g: IGame) => g.genre === selectedGenre);

    if (sortCriteria === "name") {
      if (sortType === "ascending") {
        filteredGames.sort((a: IGame, b: IGame) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      } else {
        filteredGames.sort((a: IGame, b: IGame) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
    }
    if (sortCriteria === "price") {
      if (sortType === "ascending") {
        filteredGames.sort((a: IGame, b: IGame) => a.price - b.price);
      } else {
        filteredGames.sort((a: IGame, b: IGame) => b.price - a.price);
      }
    }
    res.status(200).send({ games: filteredGames });
    if (!filteredGames) {
      res.status(500).send({ errorMessage: "There are no games with such parameters" });
    }
  }
};
