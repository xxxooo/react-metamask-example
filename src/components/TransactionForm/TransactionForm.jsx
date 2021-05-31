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


function TransactionForm() {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => {
    console.log(data);
  }

  const { ref: addressRef, ...addressProps } = register('address');
  const { ref: valueRef, ...valueProps } = register('value');
  const { ref: gasPriceRef, ...gasPriceProps } = register('gasPrice');
  const { ref: gasLimitRef, ...gasLimitProps } = register('gasLimit');


  return (
    <div className={classes.wrapper}>
      <Paper elevation={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="To Address"
                error={!!errors.address}
                helperText={errors?.address?.message}
                inputRef={addressRef}
                {...addressProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Value"
                type="number"
                error={!!errors.value}
                helperText={errors?.value?.message}
                inputRef={valueRef}
                {...valueProps}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Gas Price"
                type="number"
                defaultValue="1"
                error={!!errors.gasPrice}
                helperText={errors?.gasPrice?.message}
                inputRef={gasPriceRef}
                {...gasPriceProps}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Gas Limit"
                type="number"
                defaultValue="21000"
                error={!!errors.gasLimit}
                helperText={errors?.gasLimit?.message}
                inputRef={gasLimitRef}
                {...gasLimitProps}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default TransactionForm;
