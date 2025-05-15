import { memo, useMemo } from "react";
import { TUNIT } from "../../interfaces";

type Props = {
  unit: TUNIT;
  onClick: (e: TUNIT) => void;
  active: TUNIT;
};

const baseStyle = "h-[40px] pointer w-1/2 rounded-xl ";
const styleActive = baseStyle + "bg-[#424242] text-white ";
const styleInactive = baseStyle + "bbg-transparent text-gray-400 ";

const UnitBase = ({ onClick, unit, active }: Props) => {
  const handleEmit = () => {
    onClick(unit);
  };

  const isActive = useMemo(() => {
    return unit.value === active.value;
  }, [active]);

  return (
    <button
      onClick={handleEmit}
      className={isActive ? styleActive : styleInactive}
    >
      {unit.label}
    </button>
  );
};

export default memo(UnitBase);
