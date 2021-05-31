import React from 'react';
import metamaskFox from '../../assets/metamask-fox.svg';
import useStyles from './Logo.style';


function Logo() {
  const classes = useStyles();

  return (
    <div className={classes.logo}>
      <img src={metamaskFox} alt="metamask-fox" className={classes.logoImage} />
    </div>
  )
}

export default Logo;
