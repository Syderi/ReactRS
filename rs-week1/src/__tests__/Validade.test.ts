import { RefObject } from 'react';
import {
  validateText,
  validatePrice,
  validateDate,
  validateProductStatus,
} from '../components/pages/formPage/Validate';

describe('validateText', () => {
  test('validateText function updates input border color', () => {
    const ref = { current: { value: 'Hello', style: { borderColor: 'red' } } };
    const regex = '';
    expect(validateText(ref as RefObject<HTMLInputElement>, regex)).toBe(true);
  });

  test('validateText function returns false for invalid input', () => {
    const ref = { current: { value: 'hi frends', style: { borderColor: 'red' } } };
    const regex = '';
    expect(validateText(ref as RefObject<HTMLInputElement>, regex)).toBe(false);
  });
});

describe('validatePrice', () => {
  test('returns true if input value matches regex and is greater than 0', () => {
    const ref = { current: { value: '123', style: { borderColor: '' } } };
    expect(validatePrice(ref as RefObject<HTMLInputElement>, /\d+/)).toBe(true);
  });

  test('returns false if input value does not match regex or is less than or equal to 0', () => {
    const ref = { current: { value: '0', style: { borderColor: '' } } };
    expect(validatePrice(ref as RefObject<HTMLInputElement>, /\d+/)).toBe(false);
  });
});

describe('validateDate', () => {
  test('returns true if input date is valid and not in the future', () => {
    const ref = { current: { value: '2022-01-01', style: { borderColor: '' } } };
    expect(validateDate(ref as RefObject<HTMLInputElement>)).toBe(true);
  });

  test('returns false if input date is invalid or in the future', () => {
    const ref = { current: { value: 'invalid-date', style: { borderColor: '' } } };
    expect(validateDate(ref as RefObject<HTMLInputElement>)).toBe(false);
  });
});

describe('validateProductStatus', () => {
  test('validateProductStatus returns false if neither refNew nor refOld is checked', () => {
    const refNew = { current: { checked: false } };
    const refOld = { current: { checked: false } };

    const result = validateProductStatus(
      refNew as RefObject<HTMLInputElement>,
      refOld as RefObject<HTMLInputElement>
    );

    expect(result).toBe(false);
  });

  test('validateProductStatus returns true if either refNew or refOld is checked', () => {
    const refNew = { current: { checked: true } };
    const refOld = { current: { checked: false } };
    const result = validateProductStatus(
      refNew as RefObject<HTMLInputElement>,
      refOld as RefObject<HTMLInputElement>
    );

    expect(result).toBe(true);
  });
});
