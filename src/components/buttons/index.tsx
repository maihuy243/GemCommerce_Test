type Props = {
  label: string;
  onClick: () => void;
  disabled: boolean;
  tooltip?: string;
  classN?: string;
};

const styleBase = `w-full cursor-pointer h-[40px] text-3xl relative group hover:bg-[#424242] `;
const styleInActive = styleBase + `text-[#cccc]`;

const ButtonBase = ({ label, onClick, disabled, tooltip, classN }: Props) => {
  return (
    <button
      className={`${disabled ? styleInActive : styleBase} ${classN}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{label}</span>
      {tooltip && disabled && (
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs  py-1 rounded z-10 w-fit px-4 whitespace-nowrap">
          {tooltip}
        </span>
      )}
    </button>
  );
};

export default ButtonBase;
