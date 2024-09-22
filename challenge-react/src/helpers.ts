export const summaryDonations = (donations: number[]): number =>
  donations.reduce(
    (accumulator: number, value: number) => accumulator + value,
    0
  );
