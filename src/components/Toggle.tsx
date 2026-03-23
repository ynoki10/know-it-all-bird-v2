type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

const Toggle = ({ checked, onChange, label }: Props) => {
  return (
    <label className="flex cursor-pointer items-center justify-end">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${
          checked ? 'bg-green-500' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
      >
        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 rounded-full bg-white transition-transform`}
        />
      </button>
      <span className="ml-1 text-sm">{label}</span>
    </label>
  );
};

export default Toggle;
