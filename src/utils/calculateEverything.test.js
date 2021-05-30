import calculateEverything from './calculateEverything';

describe('The calculateEverything function', () => {
  it.only('can generate a circle blueprint', () => {
    const expectedBpString = '';
    const actual = calculateEverything('CIRCLE', null, 25, 'concrete');
    console.log(actual);
    expect(actual).toBe(expectedBpString);
  });

  it('can generate a decagon blueprint', () => {
    const expectedBpString = '';
    const actual = calculateEverything('POLYGON', 10, 20, 'concrete');
    console.log(actual);
    expect(actual).toBe(expectedBpString);
  });
});
