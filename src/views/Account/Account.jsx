import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { getAccount, requestAccount, getBalance } from '../../store/ethereum/ethereumSlice';
import Logo from '../../components/Logo';
import EthNumber from '../../components/EthNumber';
import AccountListener from './AccountListener';
import useStyles from './style';

function Account({
  account,
  balance,
  isLoading,
  getAccount,
  requestAccount,
  getBalance,
}) {
  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (account) {
      getBalance(account);
    }
  }, [account]);

  const connectClick = useCallback(requestAccount, []);

  const copyClick = useCallback(() => {
    navigator.clipboard.writeText(account)
  }, [account]);

  const classes = useStyles();

  return (
    <div className={classes.account}>
      <Logo />
      <Typography variant="h5">Account</Typography>
      {account ? (
        <>
          <Tooltip title="Copy to clipboard" placement="top">
            <Button onClick={copyClick}>
              <Typography variant="caption">{account}</Typography>
            </Button>
          </Tooltip>
          <EthNumber balance={balance} />
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={connectClick}
          disabled={isLoading}
        >
          Connect
        </Button>
      )}
      <AccountListener getAccount={getAccount} />
    </div>
  )
}

export default connect(
  (state) => ({
    account: state.ethereum.account,
    balance: state.ethereum.balance,
    isLoading: state.ethereum.isLoading,
  }),
  {
    getAccount,
    requestAccount,
    getBalance,
  },
)(Account);
