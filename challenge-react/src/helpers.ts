export const summaryDonations = (donations: number[]): number =>
  donations.reduce(
    (accumulator: number, value: number) => accumulator + value,
    0
  );

export const formatCurrency = (amount: number, currency: string = 'THB') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
