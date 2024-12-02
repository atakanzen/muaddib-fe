const validateProbability = (value: number) => {
  return !isNaN(value) && value >= 0 && value <= 100;
};

export { validateProbability };
