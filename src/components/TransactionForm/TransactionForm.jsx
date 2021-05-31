import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './TransactionForm.style';

const schema = yup.object().shape({
  address: yup.string().required(),
  value: yup.number().positive().required(),
  gasPrice: yup.number().positive().required(),
  gasLimit: yup.number().positive().integer().required(),
});


function TransactionForm({ onSubmit }) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { ref: addressRef, ...addressProps } = register('address');
  const { ref: valueRef, ...valueProps } = register('value');
  const { ref: gasPriceRef, ...gasPriceProps } = register('gasPrice');
  const { ref: gasLimitRef, ...gasLimitProps } = register('gasLimit');


  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper} elevation={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="To Address"
                fullWidth
                error={!!errors.address}
                helperText={errors?.address?.message}
                inputRef={addressRef}
                {...addressProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Value"
                fullWidth
                error={!!errors.value}
                helperText={errors?.value?.message}
                inputRef={valueRef}
                {...valueProps}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Gas Price"
                defaultValue="1"
                fullWidth
                error={!!errors.gasPrice}
                helperText={errors?.gasPrice?.message}
                inputRef={gasPriceRef}
                {...gasPriceProps}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Gas Limit"
                defaultValue="21000"
                fullWidth
                error={!!errors.gasLimit}
                helperText={errors?.gasLimit?.message}
                inputRef={gasLimitRef}
                {...gasLimitProps}
              />
            </Grid>
          </Grid>
          <Grid className={classes.submitArea} item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Send
            </Button>
          </Grid>
        </form>
      </Paper>
    </div>
  )
}

export default TransactionForm;
