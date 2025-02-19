// Функція отримання значень
function getInputValues() {
    return {
        carbon: Number(document.getElementById("carbon").value),
        hydrogen: Number(document.getElementById("hydrogen").value),
        oxygen: Number(document.getElementById("oxygen").value),
        sulfur: Number(document.getElementById("sulfur").value),
        lower_temp: Number(document.getElementById("lower_temp").value),
        humidity: Number(document.getElementById("humidity").value),
        ashiness: Number(document.getElementById("ashiness").value),
        vanadium: Number(document.getElementById("vanadium").value)
    };
}

// Обрахунок робочої маси речовини
function calcWorkMass(inputValues) {
    let humidity = inputValues.humidity;
    let workMassValues = {};
    for (let key of ["carbon","hydrogen","oxygen","sulfur","ashiness","vanadium"]) {
        let i = inputValues[key];
        let ashiness = inputValues.ashiness;
        if (key == 'ashiness' || key =='vanadium'){ashiness = 0;}
        workMassValues[key] = i * (100 - humidity - ashiness) / 100;
    }
    return workMassValues;
}

// Оновлення результатів
function updateResults(workMassValues, workTemp) {
    displayObjectResults(workMassValues, "results");
    document.getElementById("workTemp").innerHTML = workTemp.toFixed(2);
}

// Вивід результатів
function displayObjectResults(obj, elementId) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = ""; 

    for (let [key, value] of Object.entries(obj)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${key.toUpperCase()}: ${value.toFixed(2)}`;
        listElement.appendChild(listItem);
    }
}

// Обрахунок температури
function calcTemp(inputValues){
    return inputValues.lower_temp * (100 - inputValues.humidity - inputValues.ashiness) / 100 -
    0.025 * inputValues.humidity;
}

// Основна функція
function calc(){
    const inputValues = getInputValues();
    const workMassValues = calcWorkMass(inputValues);
    let workTemp = calcTemp(inputValues);
    updateResults(workMassValues, workTemp);

}