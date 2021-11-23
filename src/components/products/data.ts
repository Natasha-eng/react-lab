import { age, criteria, genre } from "app/constants/constants";

// eslint-disable-next-line import/prefer-default-export
export const sorOptiontData = [
  {
    head: "Criteria",
    htmlFor: "gamesCriteria",
    option: [criteria.name, criteria.price],
  },

  {
    head: "Type",
    htmlFor: "gamesType",
    option: [criteria.ascending, criteria.descending],
  },
];

export const genresData = [
  {
    label: "All Genres",
    htmlFor: genre.allGenres,
    value: genre.all,
  },
  {
    label: "Shooter",
    htmlFor: genre.shooter,
    value: genre.shooter,
  },
  {
    label: "Arcade",
    htmlFor: genre.arcade,
    value: genre.arcade,
  },
  {
    label: "Survive",
    htmlFor: genre.survive,
    value: genre.survive,
  },
];

export const ageData = [
  {
    label: "All Ages",
    value: age.all,
  },
  {
    label: "3+",
    value: age.age3,
  },
  {
    label: "6+",
    value: age.age6,
  },
  {
    label: "12+",
    value: age.age12,
  },
  {
    label: "18+",
    value: age.age18,
  },
];
