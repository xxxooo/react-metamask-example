import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const namespace = 'ethereum';

export const getAccount = createAsyncThunk(
  `${namespace}/getAccount`,
  async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return { accounts };
  }
)

const commonPendingReducer = (state, action) => {
  state.isLoading = true;
}

const commonRejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.error;
}

const counterSlice = createSlice({
  name: namespace,
  initialState: {
    isLoading: false,
    account: undefined,
    balance: undefined,
  },
  reducers: {},
  extraReducers: {
    [getAccount.pending]: commonPendingReducer,
    [getAccount.fulfilled]: (state, action) => {
      state.account = action.payload.accounts[0];
      state.isLoading = false;
    },
    [getAccount.rejected]: commonRejectedReducer,
  }
})

export default counterSlice.reducer
