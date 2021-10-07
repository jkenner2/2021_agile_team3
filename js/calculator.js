// Only called once submit button is clicked
function calculateBMI() {
  // Get reference weight and height inputs
  const weight = parseFloat(document.getElementById('weight').value);
  const heightFT = parseFloat(document.getElementById('heightFT').value);
  const heightIN = parseFloat(document.getElementById('heightIN').value);

  // Get reference to units
  const standard = document.getElementById('standard');

  var bmi;

  // Determine units to use
  if (standard.checked) {
    // Use standard units
    bmi = (weight / (Math.pow((convertFeetToInches(heightFT) + heightIN), 2))) * 703;
  } else {
    // Use metric units
    bmi = weight / Math.pow((heightIN / 100) + heightFT, 2);
  }

  // Call function to answer on page and check for healthy bmi
  if (bmi < 18.5) {
  // Display if underweight
     displayAnswer (bmi + " Underweight");
  } else if (18.5 < bmi && bmi < 24.9) {
  // Display if healthy
     displayAnswer (bmi + " Healthy");
  } else if (25.0 < bmi && bmi < 29.9) {
  // Display if overweight
     displayAnswer (bmi + " Overweight");
  } else {
  // Default display obese
     displayAnswer (bmi + " Obese");
  }
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
  var answer = document.createTextNode("BMI: " + String(textToDisplay));

  // attach to h3
  newH3.appendChild(answer);

  // attach h3 with pybl to div
  answerDiv.appendChild(newH3);
}

function standard () {
  // Store labels
  const lblWeight = document.getElementById('lblWeight');
  const lblHeight = document.getElementById('lblHeight');
  const lblHeight2 = document.getElementById('lblHeight2');

  // Convert units to metric
  lblWeight.innerHTML = "Weight(lbs):";
  lblHeight.innerHTML = "Feet:";
  lblHeight2.innerHTML = "Inches:";
}

function metric () {
  // Store labels
  const lblWeight = document.getElementById('lblWeight');
  const lblHeight = document.getElementById('lblHeight');
  const lblHeight2 = document.getElementById('lblHeight2');

  // Convert units to metric
  lblWeight.innerHTML = "Weight(kg):";
  lblHeight.innerHTML = "Meters:";
  lblHeight2.innerHTML = "Centimeters:";
}
