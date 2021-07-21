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
/*
function getBlueprintString(tilename, coordinates) {
  const bp = getBlueprint(tilename, coordinates);
  const bpObj = bp.toObject();
  console.log(bpObj.version);
}
*/
export { getBlueprint, getBlueprintString };