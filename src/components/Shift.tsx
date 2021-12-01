import React from "react";
import { useTimeFromTimeZone } from "../utils/timeZoneQuery";

interface ShiftProps {
  onChange: (value: string) => void;
  value: string;
}

const MAX_SHIFT_VALUE = 25;

export const Shift: React.FC<ShiftProps> = ({ onChange, value }) => {
  const { data: saltaArgentinaTime } = useTimeFromTimeZone('/America/Argentina/Salta');

  const handleSetSaltaTime = () => {
    if (saltaArgentinaTime) {
      const lastDigitsOfTimeStamp = new Date(saltaArgentinaTime.datetime).getTime().toString().slice(-2);
      const shiftValue = parseInt(lastDigitsOfTimeStamp) > MAX_SHIFT_VALUE
        ? MAX_SHIFT_VALUE.toString() : lastDigitsOfTimeStamp;
      onChange(shiftValue);
    }
  };

  return (
    <div>
      <h2>Set shift value (0 - {MAX_SHIFT_VALUE})</h2>
      <input
        type="number"
        onChange={e => {
          if (!e.target.value || parseInt(e.target.value) <= MAX_SHIFT_VALUE) {
            onChange(e.target.value)
          }
        }}
        placeholder="Set shift amount"
        value={value}
        data-testid="shift-input"
      />
      {saltaArgentinaTime && (
        <button
          onClick={handleSetSaltaTime}
          data-testid="time-stamp"
        >
          Use Salta Argentina time stamp
        </button>
      )}
    </div>
  );
};
