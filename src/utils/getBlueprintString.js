import Blueprint from 'factorio-blueprint';

function getBlueprint(tilename, coordinates) {
  // TODO: validate tilename and coordinates
  const newBlueprint = new Blueprint();
  coordinates.forEach(
    ([x, y]) => newBlueprint.createTile(tilename, { x, y })
  );
  return newBlueprint;
}

const getBlueprintString = (tilename, coordinates) => getBlueprint(tilename, coordinates).encode('latest');

export { getBlueprint, getBlueprintString };