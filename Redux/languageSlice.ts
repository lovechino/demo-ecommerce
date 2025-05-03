import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, languages } from "@/Utils/language";

interface LanguageState {
  selectedLanguage: Language;
}

const defaultLanguage = languages[0];

const initialState: LanguageState = {
  selectedLanguage: defaultLanguage,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

// Selector để lấy ngôn ngữ hiện tại từ state
export const selectLanguage = (state: { language: LanguageState }) =>
  state.language.selectedLanguage;

export default languageSlice.reducer;
