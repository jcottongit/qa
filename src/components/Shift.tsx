import React from "react";
import useSWR from "swr";

interface ShiftProps {
  onChange: (value: string) => void;
  value: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const useTimeFromTimeZone = (timeZonePath: string) => (
  useSWR<{ datetime: string }>(`http://worldtimeapi.org/api/timezone${timeZonePath}`, fetcher)
);

export const Shift: React.FC<ShiftProps> = ({ onChange, value }) => {
  const { data: saltaArgentinaTime } = useTimeFromTimeZone('/America/Argentina/Salta');

  const handleSetSaltaTime = () => {
    if (saltaArgentinaTime) {
      onChange(new Date(saltaArgentinaTime.datetime).getTime().toString());
    }
  };

  return (
    <div>
      <h2>Set shift value</h2>
      <input
        type="number"
        onChange={e => {
          onChange(e.target.value)
        }}
        placeholder="Set shift amount"
        value={value}
      />
      {saltaArgentinaTime && <button onClick={handleSetSaltaTime}>Use Salta Argentina time stamp</button>}
    </div>
  );
};
