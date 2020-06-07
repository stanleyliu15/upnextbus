import scale from "./scale";

export const space = {
  xxxs: `${scale(2)}px`,
  xxs: `${scale(4)}px`,
  xs: `${scale(6)}px`,
  sm: `${scale(8)}px`,
  md: `${scale(12)}px`,
  lg: `${scale(16)}px`,
  xlg: `${scale(20)}px`,
  xxxlg: `${scale(40)}px`
};

export const iconSize = {
  xs: scale(15),
  sm: scale(20),
  md: scale(25),
  lg: scale(30)
};
