import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getChainId, getAccount, requestAccount, getBalance } from '../../store/ethereum/ethereumSlice';
import AccountListener from './AccountListener';
import Logo from '../../components/Logo';
import EthNumber from '../../components/EthNumber';
import TransactionForm from '../../components/TransactionForm'
import useStyles from './Account.style';


function Account({
  // states
  chainId,
  account,
  balance,
  isLoading,
  // actions
  getChainId,
  getAccount,
  requestAccount,
  getBalance,
}) {
  useEffect(() => {
    getChainId();
    getAccount();
  }, []);

  useEffect(() => {
    if (account) {
      getBalance(account);
    }
  }, [account]);

  const [isFormOpen, setFormOpen] = useState(false);

  const connectClick = useCallback(requestAccount, []);

  const toggleFormClick = useCallback(() => { setFormOpen(!isFormOpen) }, [isFormOpen]);

  const copyClick = useCallback(() => {
    navigator.clipboard.writeText(account)
  }, [account]);

  const classes = useStyles();

  return (
    <div className={classes.account}>
      <AccountListener getAccount={getAccount} />
      <Logo />
      <Typography variant="subtitle2">Chain ID: {chainId}</Typography>
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
      <IconButton className={classes.toggleForm} onClick={toggleFormClick}>
        <ExpandMoreIcon className={isFormOpen && classes.hideForm} fontSize="large" />
      </IconButton>
      {isFormOpen && <TransactionForm />}
    </div>
  )
}

export default connect(
  (state) => ({
    chainId: state.ethereum.chainId,
    account: state.ethereum.account,
    balance: state.ethereum.balance,
    isLoading: state.ethereum.isLoading,
  }),
  {
    getChainId,
    getAccount,
    requestAccount,
    getBalance,
  },
)(Account);
