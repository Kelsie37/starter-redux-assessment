import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(/* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
  'suggestion/fetchSuggestion',
  async (thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3004/api/suggestion');
      if (!response.ok) {
        throw new Error('Failed to fetch suggestion');
      }
      const suggestion = await response.json();
      return suggestion;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
});

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSuggestion.pending]: (state) => {
      state.loading = true
    },
    [fetchSuggestion.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.entities = payload
    },
    [fetchSuggestion.rejected]: (state) => {
      state.loading = false
    },
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file

export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
export const selectSuggestion = (state) => state.suggestion.entities;
