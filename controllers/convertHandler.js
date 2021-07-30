const math = require('mathjs')
function ConvertHandler() {
  
  this.getNum = function(input) {
    let numbers
    //search for where the unit starts from
    let indexOfUnits = input.search(/[a-zA-Z]/)
    //handling a case where a unit isn't passed, which means we need to extract the number from the input
    if(indexOfUnits == -1) {
      numbers = input
    } else{
      numbers = input.substring(0, indexOfUnits)
    }
    //singular cases where "km" is passed instead of "1km"
    if(numbers.length == 0) {
      numbers = '1'
    }

    //to make sure that input number is not being divided more than twice
    const re = /\//
    if(numbers.split(re).length > 2) {
      return "invalid number"
    }
    return math.evaluate(numbers)
  };
  
  this.getUnit = function(input) {
    //start by figuring out where the units start including whitespaces
    let indexOfUnits = input.search(/[\sa-zA-Z]/)
    //extracting the unit from the input
    let units = input.substring(indexOfUnits, input.length)

    //making sure that the input units are in a format that it is acceptable
    let acceptableUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    //format to use in returning converted units
    let outputUnits = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"];

    //check if units has a match in acceptableUnits
    let acceptableIndex = acceptableUnits.indexOf(units)

    if(acceptableIndex >= 0) {
      return outputUnits[acceptableIndex]
    }
    return 'invalid unit'
  };
  
  this.getReturnUnit = function(initUnit) {
    //to figure out which unit is the counterpoint for the input unit...
    let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    let output = ['L','gal','km','mi','kg','lbs', "L", "gal", "km", "mi", "kg", "lbs"];

    let inputIndex = input.indexOf(initUnit)
    if(inputIndex >= 0) {
      return output[inputIndex]
    }
    return 'invalid unit'
  };

  this.spellOutUnit = function(unit) {
    //converting the abbreviated input unit into their longform
    let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"];
    let output = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms", "gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];

    let inputIndex = input.indexOf(unit)
    if(inputIndex >= 0) {
      return output[inputIndex]
    }
    return 'invalid unit'
  };
  
  this.convert = function(initNum, initUnit) {
    const rates = {
      gal: 3.78541,
      L: 1/3.78541,
      lbs: 0.453592,
      kg: 1/0.453592,
      mi: 1.60934,
      km: 1/1.60934
    }
    //using .toFixed to round our conversion to 5 d.p converts its derived result to a string, which is why we'll need to parse it
    let conversion = parseFloat( (initNum * rates[initUnit]).toFixed(5)) 
    //handling cases where initNum and initUnit are invalid
    if(initNum == 'invalid number' && initUnit == 'invalid unit') {
      return 'Invalid number and unit'
    }
    else if(initNum == 'invalid number'){
      return 'invalid number'
    }
    else if(initUnit == 'invalid unit') {
      return 'invalid unit'
    }
    
    return conversion
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
   // As part of the instructions, we need to return a long-form string of the conversion (e.g.: '3.1 miles converts to 4.98895 kilometers' )
   return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${this.convert(initNum, initUnit)} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;