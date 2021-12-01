import React from "react";

interface TextBoxProps {
  disabled: boolean;
  onChange: (value: string) => void;
  text: string;
  title: string;
}

export const TextBox: React.FC<TextBoxProps> = ({ disabled, onChange, title, text }) => (
  <div>
    <h2>{title}</h2>
    <textarea
      rows={10}
      cols={40}
      onChange={e => onChange(e.target.value)}
      value={text}
      disabled={disabled}
      data-testid={title} // Being lazy with this
    />
  </div>
);
