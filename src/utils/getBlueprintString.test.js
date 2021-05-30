import { getBlueprint, getBlueprintString } from './getBlueprintString';

describe('The getBlueprint sub-util', () => {
  it('takes a tile name and an array of one coordinate and returns a blueprint object', () => {
    const tilename = 'stone_path';
    const coordinate = [1, 2];
    const blueprint = getBlueprint(tilename, [coordinate]);
    const actualTile =  blueprint.findTile({ x: 1, y: 2 });
    expect(actualTile.name).toBe(tilename);
    const actualEmptyPosition =  blueprint.findTile({ x: 0, y: 0 });
    expect(actualEmptyPosition).toBeNull();
  });
  it('takes a tile name and an array of several coordinates and returns a blueprint object', () => {
    const tilename = 'stone_path';
    const coordA = [1, 0];
    const coordB = [1, 1];
    const coordC = [1, 2];

    const blueprint = getBlueprint(tilename, [coordA, coordB, coordC]);
    const actualTileA =  blueprint.findTile({ x: 1, y: 0 });
    expect(actualTileA.name).toBe(tilename);
    const actualTileC =  blueprint.findTile({ x: 1, y: 2 });
    expect(actualTileC.name).toBe(tilename);
    const actualEmptyPosition =  blueprint.findTile({ x: 0, y: 0 });
    expect(actualEmptyPosition).toBeNull();
  });
});

describe('The getBlueprintString util', () => {
  it('takes a tile name and an array of one coordinate and returns a blueprint object', () => {
    const expectedString = '0eJxFjDEKwzAQBP+ytQxOyiv9DZNCNgc+kE/CugQHob9HSmF3szCzBUt4czpEDVQga9QMml8OJoE7FqjfGYRsUXlI3jY4pJjFJGqPTtDD4Qt61tpCMd6bfv86fPjIfxljW8EvHBpPl1HrDzylLUM=';
    const tilename = 'stone_path';
    const coordinate = [1, 2];
    const blueprintString = getBlueprintString(tilename, [coordinate]);
    expect(blueprintString).toBe(expectedString);
  });
});