export const calculateMortgagePayment = (amount, term, interest) => {
  const mortgage = Number(amount);
  const termMonths = Number(term) * 12;
  const monthlyRate = (Number(interest) * 0.01) / 12;

  const mortgagePmt = (
    (mortgage * monthlyRate * (1 + monthlyRate) ** termMonths) /
    ((1 + monthlyRate) ** termMonths - 1)
  ).toFixed(2);

  return mortgagePmt;
};

export const calculateInterestPayment = (amount, interest) => {
  const mortgage = Number(amount);
  const monthlyRate = (Number(interest) * 0.01) / 12;

  const interestPmt = (mortgage * monthlyRate).toFixed(2);

  return interestPmt;
};

export const calculateTotalPaid = (pmtResult, term) => {
  const monthlyPmt = Number(pmtResult);
  const termMonths = Number(term) * 12;

  const totalPaid = monthlyPmt * termMonths;

  return totalPaid;
};
