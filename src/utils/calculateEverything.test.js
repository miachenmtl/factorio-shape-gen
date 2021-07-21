import calculateEverything from './calculateEverything';

describe('The calculateEverything function', () => {
  it('can generate a circle blueprint', () => {
    const expectedBpString = '0eJyV2cFuglAURdF/uWNOwkNFZdjfaByoYUCC2Cht2hj+vdj7aDu8e2bjpjGcJytNH3bq39u3WzeM1jysO1+HuzWvh8LGrm+fLx82HC+tNTa/db61Y2uFvV3v3dhdh+cln9akwr6sqTbTVATqCtUrVK9RvUF17fU6Vm9RvUP13utVrE4lyxPL85xVMF+xPA+agnletAzmNct907QP5j5q2gVzXzVtg98iXzXVwdxXTcETVvmqKXgIKl81BWeqfNXgjal81OjTxevoJ8kHBtXRm+J19I77PYnO6XX0rPg8wXO7jBn8VixHJXoP87kNzlmiR7SYRGIUiVkkhpGYRmIciXkkBpKYSIIkCZokiJKgSoIsCbokCJOgTII0CdokiJOgToI8CfokBpSYUGJEiRklhpSYUmJMiTklBpWgVIJUCVqV9RHkJ96vYL+G/Qb2de6ZQfF+B/t97iFD4IJEL1gmhhKBC5aRoUWiGIEL8s6UI1GPREESFUmUJFGTRFESVEmQpfDDNP96yJigY4KQCUomSJmgZYKYiWomypnY315hDqB+ED9oH6QPygfhg+5B9qB6FD1qHiWPikfBo95R7qh2FDtqHaWOSkeho85B5qByDDloHCQOCgeBg75B3qBuFDdq23/aDoV1Y3uZ+79/bRX20d7uP72V80/98dT28+uX32KavgHc54DI';
    const actual = calculateEverything('CIRCLE', null, 25, 'concrete');
    expect(actual).toBe(expectedBpString);
  });

  it('can generate a decagon blueprint', () => {
    const expectedBpString = '0eJyVmM1uwjAQhN/F54yUUH5z7GtUHAD5ECkEBGnVCuXdG2q77XG+EyA+UOQZ787uIxz793i9dcMY2kfoTpfhHtq3fRXGro/Pt48wHM4xtGH+6nSLYwxVuF7u3dhdhudPPkOrVRW+5pdmN02Vwy8h/wL5BeQbxtcMh/8OHx6eDTx6qOya4ZuMbz18y/BdxjemTEXWtck3kC/Crky+KLs0+SLti8mvIF/EXUC+Mfnihprx7i3MuGmeJpvNNU/GXS9k3LVCtrLrhIy7wmbc1HVR7gnCTVEz7VomPblryESzU3GPPAnq6ploZhbXicnnrs0Tze6QfUNTBbALQMZdOVP9ssvXkuGp+trFNxV3u7an3mG3jhrhyblu30vucpvqBtFZURQ2WJJhMYllMBbwWHqE2RRGX5isYXC3cSaomFvErCjmc7FLJHhFBSuAYIERrF+C5VGw+goWd8HeIdiaxBqfWFcVa9lieUAsbIglGbGYJJbBxAKeWHoUzKaC0VcwWQsGd8G5QHDsEJxqBIcmwZlMdOYTHSpFp1bRsVh07hYd7EU3B6KrCdHdh+BuRXB1I7gZ0r/F074K3RjPM/+32qzCR7zdf/hQz5/6wzH28/vXX2KavgFrPqFC';
    const actual = calculateEverything('POLYGON', 10, 20, 'concrete');
    expect(actual).toBe(expectedBpString);
  });
});
