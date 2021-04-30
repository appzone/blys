import { uniqueNamesGenerator, Config, adjectives, colors, animals, names } from "unique-names-generator";

import { ErrorReason, HttpError } from "../utils/httpError";

const getUser = () => {
  const customConfig: Config = {
    dictionaries: [names, names],
    separator: " ",
    length: 2,
  };
  return {
    name: uniqueNamesGenerator(customConfig)
  };
};

const verifyUserByCode = (code: string | number) => {
  const user = getUser();
  if (!code) {
    throw new HttpError("Code is required", ErrorReason.INVALID_INPUT);
  }

  const theCode = code.toString();
  if (theCode.length !== 6) {
    throw new HttpError("Invalid Verification Code", ErrorReason.INVALID_INPUT);
  }
  if (theCode.charAt(theCode.length - 1).toString() === "7") {
    throw new HttpError("Invalid Verification Code", ErrorReason.INVALID_INPUT);
  }
  return user;
};

export {
  verifyUserByCode,
};
