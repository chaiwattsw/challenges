export interface Charity {
  id: number;
  name: string;
  currency: string;
  image: string;
}

export interface RootState {
  donate: number;
  message: string;
}
