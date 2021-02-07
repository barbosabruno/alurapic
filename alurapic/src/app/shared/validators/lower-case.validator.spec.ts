import { isLowerCase } from "./lower-case.validator";

describe('isLowerCase function', () => {

  const lowerCaseWord = 'example';
  const capitalizedWord = 'Example';

  it('should return TRUE when a word is fully lowercase', () => {
    expect(isLowerCase(lowerCaseWord))
    .toBeTruthy();
  });

  it('should return FALSE when a word is not fully lowercase', () => {
    expect(isLowerCase(capitalizedWord))
    .toBeFalsy();
  });

});
