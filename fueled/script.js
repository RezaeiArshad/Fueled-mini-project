const addInputButton = document.getElementById("add-input");
const selectInputType = document.getElementById("input-type");
const outputButton = document.getElementById("caloutput");

function addNewInput() {
  const selectedType = selectInputType.value;
  const findType = document.querySelector(`.${selectedType} #input-container`);

  let newEntries = '';

  if (selectedType === "gasoline-vehicles" || selectedType === "diesel-vehicles") {
    newEntries = `
      <label for="${selectedType}-average">Average fuel consumption</label>
      <input id="${selectedType}-average" type="number" placeholder="liters per 100km" />
      <label for="${selectedType}-number">Number of vehicles</label>
      <input id="${selectedType}-number" type="number" placeholder="Vehicles with that consumption" />
    `;
  } else if (selectedType === "gasoline-production" || selectedType === "diesel-production") {
    newEntries = `
      <label for="${selectedType}">Fuel production</label>
      <input id="${selectedType}" type="number" placeholder="Per liters" />
    `;
  }

  findType.insertAdjacentHTML('beforeend', newEntries);
  isError = false;
}

function cleanInputs(str) {
const regex = /[\+-\s]/g;
return str.replace(regex, "")
}

function alert (str) {
const regex = /\d+e\d+/i;
return str.match(regex)
}

function getInputs() {
  const gasolineUseAverage = document.querySelectorAll(".gasoline-vehicle-avrage");
  const gasolineUseNumber = document.querySelectorAll(".gasoline-vehicle-number");
  const dieselUseAverage = document.querySelectorAll(".diesel-vehicle-average");
  const dieselUseNumber = document.querySelectorAll(".diesel-vehicle-number");
  const gasolineProduction = document.querySelectorAll(".gasoline-production");
  const dieselProduction = document.querySelectorAll(".diesel-production");

  const gasolineUseAverageInput = calculateResult(gasolineUseAverage);
  const gasolineUseNumberInput = calculateResult(gasolineUseNumber);
  const dieselUseAverageInput = calculateResult(dieselUseAverage);
  const dieselUseNumberInput = calculateResult(dieselUseNumber);
  const gasolineProductionInput = calculateResult(gasolineProduction);
  const dieselProductionInput = calculateResult(dieselProduction);
  if (isError) {
    return
  }
const gasoline = (gasolineUseAverageInput * gasolineUseNumberInput) - gasolineProductionInput;
const diesel = (dieselUseAverageInput * dieselUseNumberInput) - dieselProductionInput;
const gasolineSurplusOrDeficit = gasoline > 0 ? "Surplus" : "Deficit";
const dieselSurplusOrDeficit = diesel > 0 ? "Surplus" : "Deficit";
}

function calculateResult(list) {
let readyOutput ;
for (const item of list) {
  const circulate = cleanInputs(item.value);
  const isItInvalid = alert(circulate);

if (isItInvalid) {
  isError = true;
  alert(`Invalid Input: ${isItInvalid[0]}`);
  return null;
}
readyOutput = Number(circulate)
}
return readyOutput;
}

outputButton.addEventListener("click", getInputs);
addInputButton.addEventListener("click", addNewInput);