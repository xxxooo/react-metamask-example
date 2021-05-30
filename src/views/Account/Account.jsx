import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getAccount } from '../../store/ethereum/ethereumSlice'

function Account({
  account,
  isLoading,
  getAccount,
}) {
  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div className="account">
      Account View
      <div>
        <span>Account: </span>
        <span>{account}</span>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({
    account: state.ethereum.account,
    isLoading: state.ethereum.isLoading,
  }),
  { getAccount },
)(Account);
