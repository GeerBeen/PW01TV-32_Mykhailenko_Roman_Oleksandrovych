// Функція отримання значень
function getInputValues() {
    return {
        h: Number(document.getElementById("h").value),
        c: Number(document.getElementById("c").value),
        s: Number(document.getElementById("s").value),
        n: Number(document.getElementById("n").value),
        o: Number(document.getElementById("o").value),
        w: Number(document.getElementById("w").value),
        a: Number(document.getElementById("a").value)
    };
}
// Обрахунок коєфіцієнта від робочої до сухої
function calculateKrc(inputValues) {
    return 100 / (100 - inputValues.w);
}
// Обрахунок коєфіцієнта від робочої до горючої
function calculateKrg(inputValues) {
    return 100 / (100 - inputValues.w - inputValues.a);
}

// Обрахунок значень сухої речовини
function calculateDryValues(inputValues, Krc) {
    let dryValues = {};
    for (let key of ["h", "c", "s", "n", "o", "a"]) {
        dryValues[key] = inputValues[key] * Krc;
    }
    return dryValues;
}

// Обрахунок значень горючої речовини
function calculateCombValues(inputValues, Krg) {
    let combValues = {};
    for (let key of ["h", "c", "s", "n", "o"]) {
        combValues[key] = inputValues[key] * Krg;
    }
    return combValues;
}

// Обрахунок суми всіх значень об'єкта
function sumValues(obj) {
    return Object.values(obj).reduce((sum, value) => sum + value, 0);
}

// Обрахунок нижчої температури
function calcLowerTemp(inputValues){
    let Qrh;
    Qrh = 339*inputValues['c'] + 1030 * inputValues['h'] - 108.8 * (inputValues['o'] - inputValues['s']) - 
    25 * inputValues['w'];
    return (Qrh / 1000);
}

// Обрахунок температур
function calcTemps(inputValues){
    let qrh = calcLowerTemp(inputValues);
    let qch = (qrh + 0.025 * inputValues['w'])*(100/(100-inputValues['w']));
    let qgh = (qrh + 0.025 * inputValues['w'])*(100/(100-inputValues['w'] - inputValues['a']));

    return {
        Qrh: qrh,
        Qch: qch,
        Qgh: qgh
    };
}

// Оновлення
function updateResults(Krc, Krg, dryValues, combValues, tempValues) {
    document.getElementById("Krc").innerHTML = Krc.toFixed(2);
    document.getElementById("Krg").innerHTML = Krg.toFixed(2);
    document.getElementById("Qrh").innerHTML = tempValues['Qrh'].toFixed(2);

    displayObjectResults(dryValues, "dryResults");
    displayObjectResults(combValues, "combResults");

    document.getElementById("dryCheck").innerHTML = sumValues(dryValues).toFixed(2);
    document.getElementById("combCheck").innerHTML = sumValues(combValues).toFixed(2);
    document.getElementById("Qch").innerHTML = tempValues['Qch'].toFixed(2);
    document.getElementById("Qgh").innerHTML = tempValues['Qgh'].toFixed(2);

}
//  Вивід
function displayObjectResults(obj, elementId) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = ""; 

    for (let [key, value] of Object.entries(obj)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${key.toUpperCase()}: ${value.toFixed(2)}`;
        listElement.appendChild(listItem);
    }
}

// Основна функція 
function calc() {
    const inputValues = getInputValues();
    const Krc = calculateKrc(inputValues);
    const Krg = calculateKrg(inputValues);

    const dryValues = calculateDryValues(inputValues, Krc);
    const combValues = calculateCombValues(inputValues, Krg);

    const tempValues = calcTemps(inputValues);

    updateResults(Krc, Krg, dryValues, combValues,tempValues);


}
