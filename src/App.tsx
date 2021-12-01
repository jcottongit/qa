import React, { useState, useEffect } from 'react';
import { TextBox } from "./components/TextBox";
import { Shift } from "./components/Shift";
import { decrypt, encrypt } from "./utils/caesarsCipher";

function App() {
  const [plainText, setPlainText] = useState<string>('');
  const [shiftValue, setShiftValue] = useState<string>('');

  useEffect(() => {
    if (!shiftValue) {
      setPlainText('');
    }
  }, [shiftValue]);

  const handleEncryptText = (text: string) => {
    setPlainText(text);
  };

  const handleDecryptText = (text: string) => {
    if (shiftValue) {
      setPlainText(decrypt(text, parseInt(shiftValue)));
    }
  };

  return (
    <div>
      <Shift value={shiftValue} onChange={(value) => setShiftValue(value)} />
      <div style={{ display: 'flex'}}>
        <TextBox
          text={plainText}
          title="Plain Text"
          onChange={handleEncryptText}
          disabled={!shiftValue}
        />
        <TextBox
          text={shiftValue ? encrypt(plainText, parseInt(shiftValue)) : ''}
          title="Encrypted Text"
          onChange={handleDecryptText}
          disabled={!shiftValue}
        />
      </div>
    </div>
  );
}

export default App;
