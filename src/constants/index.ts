import { EUNIT, TUNIT } from "../interfaces";

export const LIST_UNITS: TUNIT[] = [
  {
    id: 1,
    label: "%",
    value: EUNIT.PERCENT,
  },
  {
    id: 2,
    label: "px",
    value: EUNIT.PIXEL,
  },
];

export const MAX_PERCENT_VALUE = 100;
export const MIN_PERCENT_VALUE = 0;
