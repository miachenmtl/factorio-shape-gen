const getOtherValue = (x, radius) => Math.floor(Math.sqrt(1.05 * radius * radius - x * x));

function getCirclePoints(radius) {
  const firstQuadrantPoints = [];
  for (let currentX = 0; currentX <= radius; currentX += 1) {
    const currentY = getOtherValue(currentX, radius);
    firstQuadrantPoints.push([currentX, currentY]);
  }

  const pointStrings = firstQuadrantPoints.map(JSON.stringify);
  
  for (let currentY = 0; currentY <= radius; currentY += 1) {
    const currentX = getOtherValue(currentY, radius);
    const point = [currentX, currentY];
    if (!pointStrings.includes(JSON.stringify(point))) {
      firstQuadrantPoints.push(point);
    }
  }

  const secondQuadrantPoints = firstQuadrantPoints.map(([x, y]) => [-x, y]);
  const thirdQuadrantPoints = firstQuadrantPoints.map(([x, y]) => [-x, -y]);
  const fourthQuadrantPoints = firstQuadrantPoints.map(([x, y]) => [x, -y]);

  const allPoints = [...firstQuadrantPoints, ...secondQuadrantPoints, ...thirdQuadrantPoints, ...fourthQuadrantPoints];

  return allPoints;
}

export { getCirclePoints };
