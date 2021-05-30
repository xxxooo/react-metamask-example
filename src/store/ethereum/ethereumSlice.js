import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const namespace = 'ethereum';

export const getAccount = createAsyncThunk(
  `${namespace}/getAccount`,
  async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return { accounts };
  }
)

export const requestAccount = createAsyncThunk(
  `${namespace}/requestAccount`,
  async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return { accounts };
  }
)

export const getBalance = createAsyncThunk(
  `${namespace}/getBalance`,
  async (account) => {
    const params = [account, 'latest'];
    const balance = await window.ethereum.request({ method: 'eth_getBalance', params });
    return { balance };
  }
)

const commonPendingReducer = (state, action) => {
  state.isLoading = true;
}

const commonRejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.error;
}

const accountFulfilledReducer = (state, action) => {
  state.account = action.payload.accounts[0];
  state.isLoading = false;
}

const balanceFulfilledReducer = (state, action) => {
  state.balance = action.payload.balance;
  state.isLoading = false;
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
    [getAccount.fulfilled]: accountFulfilledReducer,
    [getAccount.rejected]: commonRejectedReducer,
    [requestAccount.pending]: commonPendingReducer,
    [requestAccount.fulfilled]: accountFulfilledReducer,
    [requestAccount.rejected]: commonRejectedReducer,
    [getBalance.pending]: commonPendingReducer,
    [getBalance.fulfilled]: balanceFulfilledReducer,
    [getBalance.rejected]: commonRejectedReducer,
  }
})

export default counterSlice.reducer
