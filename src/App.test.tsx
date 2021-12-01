// @ts-nocheck
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';

jest.mock('./utils/timeZoneQuery', () => {
  return {
    useTimeFromTimeZone: () => ({ data: { datetime: '2021-12-01T13:49:21.086693-03:00' }})
  }
});

describe('<App />', () => {
  let shiftInput;
  let timezoneButton;
  let plainText;
  let encryptedText;

  beforeEach(() => {
    const { getByTestId, getByText } = render(<App />);
    timezoneButton = getByText('Use Salta Argentina time stamp');
    shiftInput = getByTestId('shift-input');
    plainText = getByTestId('Plain Text');
    encryptedText = getByTestId('Encrypted Text');
  });

  it('should encrypt text', () => {
    fireEvent.change(shiftInput, { target: { value: "5" } });
    fireEvent.change(plainText, { target: { value: "gimme a job" } });
    expect(encryptedText.value).toEqual("lnrrj f otg");
  });

  it('should decrypt text', () => {
    fireEvent.change(shiftInput, { target: { value: "8" } });
    fireEvent.change(encryptedText, { target: { value: "xigumvb qv xqhhi ikkmxbml" } });
    expect(plainText.value).toEqual("payment in pizza accepted");
  });

  it('encrypt based of Salta time stamp', () => {
    timezoneButton.click();
    fireEvent.change(plainText, { target: { value: "unless it comes with pineapple" } });
    expect(encryptedText.value).toEqual("tmkdrr hs bnldr vhsg ohmdzookd");
  });
});
