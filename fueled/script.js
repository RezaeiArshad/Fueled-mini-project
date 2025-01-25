const addInputButton = document.getElementById("add-input");
const selectInputType = document.getElementById("input-type");
const outputButton = document.getElementById("caloutput");
const clearButton = document.getElementById("clear-form")
let isError = false;

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
return str.replace(regex, " ")
}

function invalidInput (str) {
const regex = /\d+e\d+/i;
return str.match(regex)
}

function getInputs(e) {
e.preventDefault();
isError = false;
  const gasolineUseAverage = document.querySelectorAll("#gasoline-vehicles-average");
  const gasolineUseNumber = document.querySelectorAll("#gasoline-vehicles-number");
  const dieselUseAverage = document.querySelectorAll("#diesel-vehicles-average");
  const dieselUseNumber = document.querySelectorAll("#diesel-vehicles-number");
  const gasolineProduction = document.querySelectorAll("#gasoline-production");
  const dieselProduction = document.querySelectorAll("#diesel-production");

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
const outputDiv = document.querySelector(".end-div");
outputDiv.innerHTML = `
<h1 style="color: ${gasoline > 0 ? "green" : "red"}">${gasoline} Liter Gasoline ${gasolineSurplusOrDeficit}</h1>
<p>Gasoline Used: ${gasolineUseAverageInput * gasolineUseNumberInput}</p>
<p>Gasoline produced: ${gasolineProductionInput}</p>
<hr>
<h1 style="color: ${diesel > 0 ? "green" : "red"}">${diesel} Liter Diesel ${dieselSurplusOrDeficit}</h1>
<p>Diesel Used: ${dieselUseAverageInput * dieselUseNumberInput}</p>
<p>Diesel produced: ${dieselProductionInput}</p>
`;
outputDiv.style.display = "block";
}

function calculateResult(list) {
let readyOutput = 0;
for (const item of list) {
  const circulate = cleanInputs(item.value);
  const isItInvalid = invalidInput(circulate);

if (isItInvalid) {
  isError = true;
  alert(`Invalid Input: ${isItInvalid[0]}`);
  return null;
}
readyOutput = Number(circulate)
}
return readyOutput;
}

function clearPage() {
  const outputDiv = document.querySelector(".end-div");
  outputDiv.style.display = "none";
  outputDiv.innerHTML = "";
}

clearButton.addEventListener("click", clearPage)
outputButton.addEventListener("click", getInputs);
addInputButton.addEventListener("click", addNewInput);