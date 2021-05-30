const GWEI = 1000000000;
const WEI = 1000000000000000000;

export const NumberToHexString = (value) => '0x' + parseInt(value).toString(16);

export const HexStringToNumber = (value) => parseInt(value, 16);

export const showEthNumber = (balance, n = 2) => (balance / WEI).toFixed(n)
