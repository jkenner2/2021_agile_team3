// Only called once submit button is clicked
function calculateBMI() {
  // Get weight and height
  const weight = parseFloat(document.getElementById('weight').value);
  const heightFT = parseFloat(document.getElementById('heightFT').value);
  const heightIN = parseFloat(document.getElementById('heightIN').value);

  // Calculate bmi
  var bmi = (weight / (Math.pow((convertFeetToInches(heightFT) + heightIN), 2))) * 703;

  console.log(bmi.toFixed(2));

  // Call function to answer on page
  displayAnswer (bmi);
}

// Convert feet to inches
function convertFeetToInches (mesurementInFeet) {
  return mesurementInFeet * 12;
}

// Ensure that answer is displayed only once
function displayAnswer (textToDisplay) {
  const answerDiv = document.getElementById("answer");

  // Delete old answer if exits
  if (answerDiv.hasChildNodes()){
    answerDiv.removeChild(answerDiv.firstChild);
  }

  // Create new h3 to show pybl
  const newH3 = document.createElement('h3');

  // form string to show pybl
  var answer = document.createTextNode("BMI: " + String(textToDisplay.toFixed(2)));

  // attach to h3
  newH3.appendChild(answer);

  // attach h3 with pybl to div
  answerDiv.appendChild(newH3);
}
