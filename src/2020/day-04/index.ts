import * as utils from "../utils";

const REQUIRED_FIELDS = [
  "byr", // (Birth Year)
  "iyr", // (Issue Year)
  "eyr", // (Expiration Year)
  "hgt", // (Height)
  "hcl", // (Hair Color)
  "ecl", // (Eye Color)
  "pid", // (Passport ID)
  // 'cid', // (Country ID)
];
const EYE_COLORS = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const REQUIRED_VALIDATION = {
  byr: (val) => +val >= 1920 && +val <= 2002, // (Birth Year)
  iyr: (val) => +val >= 2010 && +val <= 2020, // (Issue Year)
  eyr: (val) => +val >= 2020 && +val <= 2030, // (Expiration Year)
  hgt: (val: string) => {
    const isInches = /^([0-9]+)in$/.exec(val);
    if (isInches !== null) {
      return +isInches[1] >= 59 && +isInches[1] <= 76;
    }
    const isCm = /^([0-9]+)cm$/.exec(val);
    if (isCm !== null) {
      return +isCm[1] >= 150 && +isCm[1] <= 193;
    }
    return false;
  }, // (Height) TODO:
  hcl: (val: string) => /#[0-9a-f]{6}/.test(val), // (Hair Color)
  ecl: (val) => EYE_COLORS.includes(val), // (Eye Color)
  pid: (val) => /^[0-9]{9}$/.test(val), // (Passport ID)
  // 'cid', // (Country ID)
};

const data = utils.readFile("day-04/data.txt").split(/\r?\n\r?\n/);

const validPassports = data
  .map((passport) =>
    passport.split(/\r?\n|\ /).map((keyVal) => keyVal.split(":")[0])
  )
  .filter((passportFields) =>
    REQUIRED_FIELDS.every((key) => passportFields.includes(key))
  );

console.log(validPassports.length);

const superValidPassports = data
  .map((passport) =>
    passport
      .split(/\r?\n|\ /)
      .map((keyVal) => keyVal.split(":"))
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
  )
  .filter((passport) =>
    REQUIRED_FIELDS.every((key) => Object.keys(passport).includes(key))
  )
  .filter((passport) =>
    REQUIRED_FIELDS.every((key) => REQUIRED_VALIDATION[key](passport[key]))
  );

console.log(superValidPassports.length);
