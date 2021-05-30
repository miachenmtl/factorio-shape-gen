const objectify = (userText, value) => ({ userText, value });

const tileData = [
  objectify('Stone Path', 'stone-path'),
  objectify('Concrete', 'concrete'),
  objectify('Refined Concrete', 'refined-concrete'),
  objectify('Hazard Conrete (left)', 'hazard-concrete-left'),
  objectify('Hazard Concrete (right)', 'hazard-concrete-right'),
  objectify('Hazard Refined Concrete (left)', 'refined-hazard-concrete-left'),
  objectify('Hazard Refined Concrete (right)', 'refined-hazard-concrete-right')
];

export default tileData;