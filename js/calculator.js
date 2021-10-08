// Convert the calculator face to use stand units of mesurement
function standard () {
  // Store labels
  var lblWeight = document.getElementById('lblWeight');
  var lblLargerHeight = document.getElementById('lblLargerHeight');
  var lblSmallerHeight = document.getElementById('lblSmallerHeight');

  // Convert labels to metric
  lblWeight.innerHTML = "Weight(lbs):";
  lblLargerHeight.innerHTML = "Feet:";
  lblSmallerHeight.innerHTML = "Inches:";

  // get values
  var input = getRefenceToTextFields();

  // Format
  var weight = parseFloat(input[0].value);
  var largerHeight = parseFloat(input[1].value);
  var smallerHeight = parseFloat(input[2].value);

  // calculate
  input[0].value = (weight * 2.2);
  input[1].value = (largerHeight * 3.2);
  input[2].value = (smallerHeight * 0.3);
}

// Convert the calculator face to use metric units of mesurement
function metric () {
  // Store element labels
  var lblWeight = document.getElementById('lblWeight');
  var lblLargerHeight = document.getElementById('lblLargerHeight');
  var lblSmallerHeight = document.getElementById('lblSmallerHeight');

  // Convert labels to metric
  lblWeight.innerHTML = "Weight(kg):";
  lblLargerHeight.innerHTML = "Meters:";
  lblSmallerHeight.innerHTML = "Centimeters:";

  // Get values
  input = getRefenceToTextFields();

  // Format
  var weight = parseFloat(input[0].value);
  var largerHeight = parseFloat(input[1].value);
  var smallerHeight = parseFloat(input[2].value);
  
  // Calulate
  input[0].value = (weight * 0.4);
  input[1].value = (largerHeight * 0.3);
  input[2].value = (smallerHeight * 2.5);
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
    bmi = weight / Math.pow(convertCentimetersToMeters(smallerHeight) + largerHeight, 2);
  }

  // Format to only include 2 decimal places and return bmi
  return bmi.toFixed(2);
}

// Calculate the users's Basal Metabolic Rate (BMR)
function calculateBMR() {
  // Caputre input as array
  var input = getRefenceToTextFields();

  // Format and assign values
  var weight = parseFloat(input[0].value);        // Weight
  var largerHeight = parseFloat(input[1].value);  // m or ft Height
  var smallerHeight = parseFloat(input[2].value); // in or cm Height
  var age = parseFloat(input[3].value);           // Age

  // Get reference to units
  var standard = document.getElementById('standard');

  // Get reference to male radio button
  var male = document.getElementById('male');

  // Member variable to hold final calculation
  var bmr = null;

  // Determine which units to use by seeing if standard radio button is checked
  if (standard.checked) {
    // Its checked, use standard units
    // Determine which equation to use by seeing if the male radio button is checked
    if (male.checked) {
      // Its checked, use male calculation
      bmr = 66 + (6.23 * weight) + (12.7 * (convertFeetToInches(largerHeight) + smallerHeight)) - (6.8 * age);

    } else {
      // Its not checked, use female calculation
      bmr = 655 + (4.35 * weight) + (4.7 * (convertFeetToInches(largerHeight) + smallerHeight)) - (4.7 * age);
    }
  } else {
    // Its not checked, use metric units
    // Determine which equation to use by seeing if the male radio button is checked
    if (male.checked) {
      // Its checked, use male calculation
      bmr = 66 + (13.7 * weight) + (5 * (convertMetersToCentimeters(largerHeight) + smallerHeight)) - (6.8 * age);
    } else {
      // Its not checked, use female
      bmr = 655 + (9.6 * weight) + (1.8 * (convertMetersToCentimeters(largerHeight) + smallerHeight)) - (4.7 * age);
    }
  }
  // Format to only include 2 decimal places and return bmi
  return bmr.toFixed(2);
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
  // 3: Age
  var age = document.getElementById('age');

  // Create array to return
  var weightHeight = [weight, largerHeight, smallerHeight, age];

  // Return array of inputs
  return weightHeight;
}

// Check each text input box for numeric input
function validateData() {
  // Get reference to texboxes to validate
  var input = getRefenceToTextFields();

  // Inital variable for if input is valid (starts valid)
  var notValid = false;

  input.forEach(function (valueObject) {
    if (isNaN(parseFloat(valueObject.value))) {
      // Warn user of their mistake
      displayAnswer ("Please ensure your input is valid!");
      // Clear field
      valueObject.value = "";
      // Move cursor to field
      valueObject.focus();
      // Change to return true (found invald input)
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
function convertCentimetersToMeters (mesurementInCentimeters) {
  // Devide by 100
  return mesurementInCentimeters / 100;
}

// Convert meters to centimeters
function convertMetersToCentimeters (mesurementInMeters) {
  // Devide by 100
  return mesurementInMeters * 100;
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

// Calculate activity level
function activityLevel(bmr) {
  // get reference to selections
  var sedentary = document.getElementById('sedentary');
  var light = document.getElementById('lightAct');
  var moderate = document.getElementById('moderateAct');
  var very = document.getElementById('veryAct');

  // Check and Calculate
  if (sedentary.checked) {
    return (bmr * 1.2);
  } else if (light.checked) {
    return (bmr * 1.375);
  } else if (moderate.checked) {
    return (bmr * 1.55);
  } else if (very.checked) {
    return (bmr * 1.725);
  } else {
    return (bmr * 1.9);
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
  if (validateData()) {
    return;
  }

  // Call the function calculateBMI to calculate bmi value
  var bmi = calculateBMI();

  // Call the fucntion calculateBMR to calulate bmr value
  var bmr = calculateBMR();

  // Determine if bmi is healthy
  var healthy = healthLevel(bmi);

  // Determine active bmr
  var active = activityLevel(bmr);

  // Display the calculated information back to the user
  displayAnswer ("Your BMI is " + bmi + ", and this shows that you are " + healthy + ". Your BMR is " + bmr + ".<br>"
    + "Your Daily calorie burn is " + active + ".");
}
