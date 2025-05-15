export enum EUNIT {
  PERCENT = "percent",
  PIXEL = "picel",
}

export type TUNIT = {
  id: number;
  label: string;
  value: EUNIT;
};
