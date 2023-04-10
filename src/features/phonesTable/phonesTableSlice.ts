import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { initPhones } from "./phonesTableAPI";

export interface Phone {
  id: string;
  name: string;
  photo: string;
  icon: string;
  producer: string;
  releaseYear: number;
  diagonal: number;
  countryOfProducer: string;
  storage: number;
  frequency: number;
  nfc: boolean;
  esim: boolean;
  wirelessCharging: boolean;
  price: number;
}

export interface PhonesTableState {
  phones: Phone[];
  countForShow: number;
  rangeForShow: number[];
  onlyDifference: boolean;
  idPhoneForChange: string;
}

function createArray(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

const phones = initPhones();
const minForShow = 2;
const maxForShow = phones.length > 6 ? 6 : phones.length;
const initialState: PhonesTableState = {
  phones,
  countForShow: 3,
  rangeForShow: createArray(minForShow, maxForShow, 1),
  onlyDifference: false,
  idPhoneForChange: "",
};

export const phonesTableSlice = createSlice({
  name: "phonesTable",
  initialState,
  reducers: {
    setCountForShow: (state, action: PayloadAction<number>) => {
      state.countForShow = action.payload;
    },
    changePhone: (state, action: PayloadAction<string>) => {
      const idSource = state.idPhoneForChange;
      if (!idSource) return;
      const idChange = action.payload;
      const idxSource = state.phones.findIndex((item) => item.id === idSource);
      const idxChange = state.phones.findIndex((item) => item.id === idChange);
      state.phones = [
        ...state.phones.slice(0, idxSource),
        state.phones[idxChange],
        ...state.phones.slice(idxSource + 1, idxChange),
        state.phones[idxSource],
        ...state.phones.slice(idxChange + 1),
      ];

      state.idPhoneForChange = idChange;
    },
    setOnlyDifference: (state, action: PayloadAction<boolean>) => {
      state.onlyDifference = action.payload;
    },
    setIdPhoneForChange: (state, action: PayloadAction<string>) => {
      state.idPhoneForChange = action.payload;
    },
  },
});

export const {
  setCountForShow,
  changePhone,
  setOnlyDifference,
  setIdPhoneForChange,
} = phonesTableSlice.actions;

export const selectVisiblePhones = (state: RootState) =>
  state.phones.phones.slice(0, state.phones.countForShow);

export const selectHidePhones = (state: RootState) => {
  if (state.phones.phones.length <= state.phones.countForShow) {
    return [];
  }
  return state.phones.phones.slice(state.phones.countForShow);
};

export const selectPhone = (state: RootState, id: string) =>
  state.phones.phones.find((phone) => phone.id === id);

export const selectCountForShow = (state: RootState) =>
  state.phones.countForShow;

export const selectRangeForShow = (state: RootState) =>
  state.phones.rangeForShow;

export const selectOnlyDifference = (state: RootState) =>
  state.phones.onlyDifference;

export const selectIdPhoneForChange = (state: RootState) =>
  state.phones.idPhoneForChange;

export default phonesTableSlice.reducer;
