// Convert the calculator face to use stand units of mesurement
function onStandardClick () {
  // Store labels
  var lblWeight = document.getElementById('lblWeight');
  var lblLargerHeight = document.getElementById('lblLargerHeight');
  var lblSmallerHeight = document.getElementById('lblSmallerHeight');
  var lblwaist = document.getElementById('lblwaist');
  var lblhip = document.getElementById('lblhip');
  var lblneck = document.getElementById('lblneck');

  // Prevent user from spamming unit conversion radio button
  if (lblWeight.innerHTML == "Weight(lbs):" && lblLargerHeight.innerHTML == "Feet:" && lblSmallerHeight.innerHTML == "Inches:") {
    return;
  }

  // Convert labels to metric
  lblWeight.innerHTML = "Weight(lbs):";
  lblLargerHeight.innerHTML = "Feet:";
  lblSmallerHeight.innerHTML = "Inches:";
  lblwaist.innerHTML = "Waist(in)";
  lblhip.innerHTML = "Hip(in)";
  lblneck.innerHTML = "Neck(in)";

  // Get refence to each text field (Array returned)
  var input = getRefenceToTextFields();

  // Convert each input to float type
  var weight = parseFloat(input[0].value);
  var largerHeight = parseFloat(input[1].value);
  var smallerHeight = parseFloat(input[2].value);
  var waist = parseFloat(input[4].value);
  var hip = parseFloat(input[5].value);
  var neck = parseFloat(input[6].value);

  // Convert values to standard from metric
  input[0].value = (weight * 2.2046226218).toFixed(0);

  // Use function to convert to standard
  var metricArray = convertHeightToStandardFromMetric(largerHeight, smallerHeight);

  // Change to calcuclated height values
  input[1].value = metricArray[0];
  input[2].value = metricArray[1];
  // Change measurements
  input[4].value = (waist * 0.3937007874).toFixed(0);
  input[5].value = (hip * 0.3937007874).toFixed(0);
  input[6].value = (neck * 0.3937007874).toFixed(0);
}

// Convert the calculator face to use metric units of mesurement
function onMetricClick () {
  // Store element labels
  var lblWeight = document.getElementById('lblWeight');
  var lblLargerHeight = document.getElementById('lblLargerHeight');
  var lblSmallerHeight = document.getElementById('lblSmallerHeight');
  var lblwaist = document.getElementById('lblwaist');
  var lblhip = document.getElementById('lblhip');
  var lblneck = document.getElementById('lblneck');

  // Prevent user from spamming unit conversion radio button
 if (lblWeight.innerHTML == "Weight(kg):" && lblLargerHeight.innerHTML == "Meters:" && lblSmallerHeight.innerHTML == "Centimeters:") {
   return;
 }

  // Convert labels to metric
  lblWeight.innerHTML = "Weight(kg):";
  lblLargerHeight.innerHTML = "Meters:";
  lblSmallerHeight.innerHTML = "Centimeters:";
  lblwaist.innerHTML = "Waist(cm)";
  lblhip.innerHTML = "Hip(cm)";
  lblneck.innerHTML = "Neck(cm)";

  // Get values
  var input = getRefenceToTextFields();

  // Format
  var weight = parseFloat(input[0].value);
  var largerHeight = parseFloat(input[1].value);
  var smallerHeight = parseFloat(input[2].value);
  var waist = parseFloat(input[4].value);
  var hip = parseFloat(input[5].value);
  var neck = parseFloat(input[6].value);

  // Convert values to metric from standard
  input[0].value = (weight * 0.45359237).toFixed(0);
  // Use function to convert to metric
  var metricArray = convertHeightToMetricFromStandard(largerHeight, smallerHeight);

  // Change to calcuclated height values
  input[1].value = metricArray[0];
  input[2].value = metricArray[1];
  // Change measurements
  input[4].value = (waist * 2.54).toFixed(0);
  input[5].value = (hip * 2.54).toFixed(0);
  input[6].value = (neck * 2.54).toFixed(0);
}

function convertHeightToMetricFromStandard(feet, inches) {
  // Calculate height in inches
  var composite = parseFloat(convertFeetToInches(feet).toFixed(0)) + parseFloat(inches);

  // Convernt inches to cm
  composite = (composite * 2.54).toFixed(0);

  // Extract height in meters
  var meters = Math.floor(convertCentimetersToMeters(composite));

  // Extract height in cm
  var cm = composite - (convertMetersToCentimeters(meters));

  // Put into array for output
  var output = [meters, cm];

  // Retrun output
  return output;
}

function convertHeightToStandardFromMetric(meters, centimeters) {
  // Calculate height in inches
  var composite = parseFloat(convertMetersToCentimeters(meters).toFixed(0)) + parseFloat(centimeters);

  // Convernt cm to inches
  composite = (composite * 0.3937007874).toFixed(0);
  // Extract height in feet
  var feet = Math.floor(convertInchestoFeet(composite));

  // Extract height in inches
  var inches = composite - (convertFeetToInches(feet)) ;

  // Put into array for output
  var output = [feet, inches];

  // Retrun output
  return output;
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
  var male_gender = document.getElementById('male');

  // Member variable to hold final calculation
  var bmr = null;

  // Determine which units to use by seeing if standard radio button is checked
  if (standard.checked) {
    // Its checked, use standard units
    // Determine which equation to use by seeing if the male radio button is checked
    if (male_gender.checked) {
      // Its checked, use male calculation
      bmr = 66 + (6.23 * weight) + (12.7 * (convertFeetToInches(largerHeight) + smallerHeight)) - (6.8 * age);

    } else {
      // Its not checked, use female calculation
      bmr = 655 + (4.35 * weight) + (4.7 * (convertFeetToInches(largerHeight) + smallerHeight)) - (4.7 * age);
    }
  } else {
    // Its not checked, use metric units
    // Determine which equation to use by seeing if the male radio button is checked
    if (male_gender.checked) {
      // Its checked, use male calculation
      bmr = 66 + (13.7 * weight) + (5 * (convertMetersToCentimeters(largerHeight) + smallerHeight)) - (6.8 * age);
    } else {
      // Its not checked, use female
      bmr = 655 + (9.6 * weight) + (1.8 * (convertMetersToCentimeters(largerHeight) + smallerHeight)) - (4.7 * age);
    }
  }
  // Format to only include 2 decimal places and return bmi
  return bmr.toFixed(0);
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
  // 4: Waist
  var waist = document.getElementById('waist');
  // 5: Hip
  var hip = document.getElementById('hip');
  // 6: Neck
  var neck = document.getElementById('neck');
  // Create array to return
  var weightHeightAge = [weight, largerHeight, smallerHeight, age, waist, hip, neck];

  // Return array of inputs
  return weightHeightAge;
}

// Check each text input box for numeric input
function validateData() {
  // Get reference to texboxes to validate
  var input = getRefenceToTextFields();
  var standard = document.getElementById('standard');
  var metric = document.getElementById('metric');

  // Inital variable for if input is valid (starts valid)
  var notValid = false;

  input.forEach(function (valueObject) {
    // Ensure input is numberic, greater than 0, and not too large
    if ((isNaN(parseFloat(valueObject.value))) || (valueObject.value < 0)) {
      // Warn user of their mistake
      displayAnswer ("Please ensure your input is valid!");
      // Clear field
      valueObject.value = "";
      // Move cursor to field
      valueObject.focus();
      // Change to return true (found invald input)
      notValid = true;
    } else if (standard.checked && (input[0].value > 800 || input[1].value > 8 || input[2].value > 12 || input[3].value > 120 || input[4].value > 100 || input[5].value > 120 || input[6].value > 50)) {
      displayAnswer ("Your inputs are too high!");
      valueObject.focus();
      notValid = true;
    } else if (metric.checked && (input[0].value > 370 || input[1].value > 2.5 || input[2].value > 100 || input[3].value > 120 || input[4].value > 254 || input[5].value > 304 || input[6].value > 127)) {
      displayAnswer ("Your inputs are too high!");
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
function convertCentimetersToMeters (mesurementInCentimeters) {
  // Devide by 100
  return mesurementInCentimeters / 100;
}

// Convert meters to centimeters
function convertMetersToCentimeters (mesurementInMeters) {
  // Devide by 100
  return mesurementInMeters * 100;
}

function convertInchestoFeet (mesurementInInches) {
  // Devide by 12
  return mesurementInInches / 12;
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

  // create local variable for output
  var output;

  // Check and Calculate
  if (sedentary.checked) {
    output = (bmr * 1.2);
  } else if (light.checked) {
    output =  (bmr * 1.375);
  } else if (moderate.checked) {
    output =  (bmr * 1.55);
  } else if (very.checked) {
    output =  (bmr * 1.725);
  } else {
    output =  (bmr * 1.9);
  }

  return output.toFixed(0);
}

// Calculate max hr
function maxHeartRate() {
  // Get reference to user inputs
  var inputArray = getRefenceToTextFields();

  // Extract age from array
  var age = parseFloat(inputArray[3].value);

  // Calulate max heart rate
  return 220 - age;
}

// Calculate Daily water intake
function waterIntake() {
  // Get reference to user inputs
  var inputArray = getRefenceToTextFields();
  var sedentary = document.getElementById('sedentary');
  var light = document.getElementById('lightAct');
  var moderate = document.getElementById('moderateAct');
  var very = document.getElementById('veryAct');

  // Extract weight from array
  var weight = parseFloat(inputArray[0].value);

  // Create variable for water
  var waterIntake = 0.0;
  // Calculate water intake
  if (sedentary.checked) {
    waterIntake = (weight * 0.67);
  } else if (light.checked) {
    waterIntake = ((weight * 0.67) + 12.00);
  } else if (moderate.checked) {
    waterIntake = ((weight * 0.67) + 18.00);
  } else if (very.checked) {
    waterIntake = ((weight * 0.67) + 24.00);
  } else {
    waterIntake = ((weight * 0.67) + 30.00);
  }

  return waterIntake.toFixed(0);
}

// Calculate target heart rate based off max heart rate
function targetHeartRate(maxHR) {
  // Calculate upper and lower target heart rate
  // and store in values in array
  var targetArray = [(maxHR * 0.5).toFixed(0), (maxHR * 0.85).toFixed(0)];

  // Return array
  return targetArray;
}

// Calculate body fat precent
function bodyFat() {
  // Get refence to variables
  var inputArray = getRefenceToTextFields();
  var tallerHeight = parseFloat(inputArray[1].value);
  var smallerHeight = parseFloat(inputArray[2].value);
  var waist = parseFloat(inputArray[4].value);
  var hip = parseFloat(inputArray[5].value);
  var neck = parseFloat(inputArray[6].value);
  var male = document.getElementById('male');
  var standard = document.getElementById('standard');
  var bodyFatPrecent = 0.0;

  // Check if male or female and standard or metric
  if (male.checked){

    if (standard.checked){

      bodyFatPrecent = 86.010*Math.log10(waist-neck) - 70.041*Math.log10((tallerHeight + smallerHeight/12)) + 36.76;

    } else {

      bodyFatPrecent = 495 / (1.0324 - 0.19077*Math.log10(waist-neck) + 0.15456*Math.log10((tallerHeight + smallerHeight/12))) - 450;

    }

  } else {

    if (standard.checked){

      bodyFatPrecent = 163.205*Math.log10(waist + hip - neck) - 97.684*Math.log10(height) - 78.387;

    } else {

      bodyFatPrecent = 495 / (1.29579 - 0.35004*Math.log10(waist + hip - neck) + 0.221*Math.log10(height)) - 450;

    }

  } // End of else

  bodyFatPrecent = 100 - bodyFatPrecent;

  return (bodyFatPrecent).toFixed(0);
}

// function to calculate fat weight
function fatWeight(fat){
  //Get reference to fields
  var inputArray = getRefenceToTextFields();

  var weight = parseFloat(inputArray[0].value);

  // calculate
  return (fat/100)*weight;
}

// Function to calculate ideal body weight
function calculateIdealBodyWeight(){
  // Get refernce to text fields
  var inputArray = getRefenceToTextFields();

  // Seperate out required data
  var tallerHeight = parseFloat(inputArray[1].value);
  console.log(tallerHeight);
  var smallerHeight = parseFloat(inputArray[2].value);
  console.log(smallerHeight);
  var male = document.getElementById('male');
  var standard = document.getElementById('standard');
  var output;
  var inchesOverFiveFeet

  if (standard.checked) {
    inchesOverFiveFeet = (convertFeetToInches(tallerHeight) + smallerHeight) - 60;
    console.log(inchesOverFiveFeet);
  } else {
    inchesOverFiveFeet = ((convertMetersToCentimeters(tallerHeight) + smallerHeight) - 152.4) / 2.54;
    console.log(inchesOverFiveFeet);
  }

  if (male.checked) {
    output = 123.9 + (3.1 * inchesOverFiveFeet);
  } else {
    output = 117.1 + (3.0 * inchesOverFiveFeet);
  }
  return output.toFixed(0);
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

  // Calculate max heart rate
  var maxHR = maxHeartRate();

  // Calculate targetHR zone (50 - 80%) returning array for low/high
  var targetHR = targetHeartRate(maxHR);

  // Calculate gaining weight losing weight and staying at the same weight
  var lose = +active - 500;
  var gain = +active + 500;

  // Calculate water intake
  var water = waterIntake();

  // Calculate Body fat
  var fat = bodyFat();

  // calculate fat weight
  var fatty = (fatWeight(fat)).toFixed(0);

  // Calculate ideal body weight
  var idealBodyWeight = calculateIdealBodyWeight();

  // Display the calculated information back to the user
  displayAnswer ("Your BMI is " + bmi + ", and this shows that you are " + healthy + ". Your BMR is " + bmr + ". Your daily calorie burn is aproximatley " + active + ". Your max heart rate is " + maxHR + ". While working out, try to keep your heart reate between " + targetHR[0] + " and " + targetHR[1] + ". For you to gain weight while working out you need to eat " + gain + " calories. To lose weight you need to eat " + lose + " Calories. The amount of water you also need to drink is " + water + "oz. Your body fat precentage is " + fat + "%. This fat weighs " + fatty + "lbs. Your ideal body weight is around " + idealBodyWeight + " lbs.");
}
