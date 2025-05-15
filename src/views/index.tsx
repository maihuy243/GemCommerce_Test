import { useCallback, useEffect, useMemo, useState } from "react";
import { EUNIT, TUNIT } from "../interfaces";
import { LIST_UNITS, MAX_PERCENT_VALUE, MIN_PERCENT_VALUE } from "../constants";
import UnitBase from "../components/units";
import ButtonBase from "../components/buttons";
import InputBase from "../components/input";
import { usePrevious } from "../hooks/usePrev";

const ViewContent = () => {
  const [unitActive, setUnitActive] = useState<TUNIT>(LIST_UNITS[0]);
  const [input, setInput] = useState<string>();

  const oldValue = usePrevious<string | undefined>(input);

  const onChangeUnit = useCallback((e: TUNIT) => {
    setUnitActive(e);
  }, []);

  const onBlur = useCallback(() => {
    const num = Number(input) || 0;
    // Pixel
    if (unitActive.value === EUNIT.PIXEL) {
      if (num >= MIN_PERCENT_VALUE) return;
      setInput(String(MIN_PERCENT_VALUE));
    }

    // Unit
    if (unitActive.value === EUNIT.PERCENT) {
      if (num > MAX_PERCENT_VALUE) {
        setInput(oldValue);
        return;
      }

      if (num < MIN_PERCENT_VALUE) {
        setInput(String(MIN_PERCENT_VALUE));
        return;
      }
    }
  }, [input, unitActive]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const rep = value.replace(/,/g, ".");
    const sanitized = rep
      .replace(/[^0-9.\-]/g, "") // 1-9 + .
      .replace(/(?!^)-/g, "")
      .replace(/(\..*?)\..*/g, "$1"); // first dot
    setInput(sanitized);
  };

  const handlePressButton = (type: "+" | "-") => {
    let num = Number(input) || 0;
    const result = type === "+" ? ++num : --num;
    setInput(String(result));
  };

  const isMaxValue = useMemo(() => {
    const num = Number(input) || 0;
    return unitActive.value === EUNIT.PERCENT && num >= MAX_PERCENT_VALUE;
  }, [input, unitActive]);

  const isMinValue = useMemo(() => {
    const num = Number(input) || 0;
    return unitActive.value === EUNIT.PERCENT && num <= MIN_PERCENT_VALUE;
  }, [input, unitActive]);

  useEffect(() => {
    // Unit
    if (unitActive.value === EUNIT.PERCENT) {
      const num = Number(input) || 0;
      if (num > MAX_PERCENT_VALUE) setInput(String(MAX_PERCENT_VALUE));
      if (num < 0) setInput(String(0));
    }
  }, [unitActive.id]);

  return (
    <div>
      {/* Unit View */}
      <div className="flex items-center">
        <div className="w-1/3">Unit</div>
        <div className="w-2/3 bg-[#212121] rounded-xl p-1 flex justify-around">
          {LIST_UNITS.map((u: TUNIT) => (
            <UnitBase
              unit={u}
              active={unitActive}
              onClick={onChangeUnit}
              key={u.id}
            />
          ))}
        </div>
      </div>

      {/* Value View */}
      <div className="flex items-center mt-3">
        <div className="w-1/3">Value</div>
        <div className="w-2/3  bg-[#212121] rounded-xl flex justify-around ">
          <div className="w-1/5">
            <ButtonBase
              disabled={isMinValue}
              onClick={() => handlePressButton("-")}
              label="-"
              tooltip="Value must greater than 0"
              classN="rounded-bl-xl rounded-tl-xl"
            />
          </div>
          <div className="w-3/5">
            <InputBase value={input} onBlur={onBlur} onChange={onChangeInput} />
          </div>
          <div className="w-1/5">
            <ButtonBase
              disabled={isMaxValue}
              onClick={() => handlePressButton("+")}
              label="+"
              tooltip="Value must smaller than 100"
              classN="rounded-br-xl rounded-tr-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;
