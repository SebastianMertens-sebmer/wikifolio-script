const convertToString = (value: string | number) => {
  if (typeof value === "number") {
    return value.toString();
  }

  return value;
};

export default convertToString;
