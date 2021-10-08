// Convert the calculator face to use stand units of mesurement
function standard () {
  // Store labels
  var lblWeight = document.getElementById('lblWeight');
  var lblLargerHeight = document.getElementById('lblLargerHeight');
  var lblSmallerHeight = document.getElementById('lblSmallerHeight');

  // Convert units to metric
  lblWeight.innerHTML = "Weight(lbs):";
  lblLargerHeight.innerHTML = "Feet:";
  lblSmallerHeight.innerHTML = "Inches:";
}

// Convert the calculator face to use metric units of mesurement
function metric () {
  // Store element labels
  var lblWeight = document.getElementById('lblWeight');
  var lblLargerHeight = document.getElementById('lblLargerHeight');
  var lblSmallerHeight = document.getElementById('lblSmallerHeight');

  // Convert element units to metric
  lblWeight.innerHTML = "Weight(kg):";
  lblLargerHeight.innerHTML = "Meters:";
  lblSmallerHeight.innerHTML = "Centimeters:";
}

// Calculate the users's bmi
function calculateBMI() {
  // Caputre input as array
  var input = getRefenceToTextFields();

  // Format and assign values
  var weight = parseFloat(input[0].value);        // Weight
  var largerHeight = parseFloat(input[1].value);  // m or ft Height
  var smallerHeight = parseFloat(input[2].value); // in or cm Height

  // Get reference to units
  var standard = document.getElementById('standard');

  // Member variable to hold final calculation
  var bmi = null;

  // Determine which units to use by seeing if standard radio button is checked
  if (standard.checked) {
    // Its checked, use standard units
    bmi = (weight / (Math.pow((convertFeetToInches(largerHeight) + smallerHeight), 2))) * 703;
  } else {
    // Its not checked, use metric units
    bmi = weight / Math.pow(convertCentimetersToMeeters(smallerHeight) + largerHeight, 2);
  }

  // Format to only include 2 decimal places and return bmi
  return bmi.toFixed(2);
}

// Grab a reference to each input text box
function getRefenceToTextFields() {
  // Get reference weight and height inputs
  // 0: Weight
  var weight = document.getElementById('weight');
  // 1: larger height
  var largerHeight = document.getElementById('largerHeight');
  // 2: Smaller height
  var smallerHeight = document.getElementById('smallerHeight');

  // Create array to return
  var weightHeight = [weight, largerHeight, smallerHeight]

  // Return array of inputs
  return weightHeight;
}

// Check each text input box for numeric input
function validData() {
  var input = getRefenceToTextFields();
  // Create member variable for input validation
  var notValid = false;

  // Create array for easy step through
  var input = [weight, largerHeight, smallerHeight]

  input.forEach(function (valueObject) {
    if (isNaN(parseFloat(valueObject.value))) {
      displayAnswer ("Please ensure your input is valid!");
      valueObject.focus();
      notValid = true;
    }
  });

  // Return True (not valid) or False (valid)
  return notValid;
}

// Convert feet to inches
function convertFeetToInches (mesurementInFeet) {
  // Mulitply by 12
  return mesurementInFeet * 12;
}

// Convert centimeters to meeters
function convertCentimetersToMeeters (mesurementInCentimeetrs) {
  // Devide by 100
  return mesurementInCentimeetrs / 100;
}

// Determine how healhty bmi is
function healthLevel(bmi) {
  // Call function to answer on page and check for healthy bmi
  if (bmi < 18.5) {
  // Display if underweight
     return "underweight";
  } else if (18.5 < bmi && bmi < 24.9) {
  // Display if healthy
     return "healthy";
  } else if (25.0 < bmi && bmi < 29.9) {
  // Display if overweight
     return "overweight";
  } else {
  // Default display obese
    return " obese";
  }
}

// Ensure that answer is displayed only once
function displayAnswer (textToDisplay) {
  var answerDiv = document.getElementById("answer");

  // Delete old answer if exits
  if (answerDiv.hasChildNodes()){
    answerDiv.removeChild(answerDiv.firstChild);
  }

  // Create new h3 for text
  var newH3 = document.createElement('h3');

  // Change h3 text
  var answer = document.createTextNode(textToDisplay);

  // Attach text to h3
  newH3.appendChild(answer);

  // Attach h3 with text to div
  answerDiv.appendChild(newH3);
}

// Only called once submit button is clicked
function onSubmitClick() {
  // Determine input is usable
  if (validData()) {
    return;
  };

  // Call the function calculateBMI to calculate bmi value
  var bmi = calculateBMI();

  // Determine if bmi is healthy
  var healthy = healthLevel(bmi);

  // Display the calculated information back to the user
  displayAnswer ("Your BMI is " + bmi + ", and this shows that you are " + healthy + ".");
}
