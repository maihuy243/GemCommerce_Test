import { ChangeEventHandler } from "react";

type Props = {
  value: string | number | readonly string[] | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: () => void;
};

const InputBase = ({ value, onBlur, onChange }: Props) => {
  return (
    <input
      className="w-full bg-transparent h-[40px] text-center"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default InputBase;
