const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('function convertHandler.getNum(input)', () => {
    test('should correctly read a whole number input', (done) => {
      let input = '65km'
      assert.equal(convertHandler.getNum(input), 65)
      done()
    })

    test('should correctly read a decimal number input', (done) => {
      let input = '4.1mi'
      assert.equal(convertHandler.getNum(input), 4.1)
      done()
    })

    test('should correclty read a fractional input', (done) => {
      let input = '1/2km'
      assert.equal(convertHandler.getNum(input), 0.5)
      done()
    })

    test('should correctly read a fractional input with a decimal', (done) => {
      let input = '2.5/10km'
      assert.equal(convertHandler.getNum(input), 0.25)
      done()
    })

    test('should correctly return an error on a double fraction', (done) => {
      let input = '3/2/3'
      assert.equal(convertHandler.getNum(input), 'invalid number')
      done()
    })

    test('should default to a numerical input of 1 when no number is passed as input', (done) => {
      let input = 'mi'
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })
  })

  suite('function convertHandler.getUnit(input)', () => {
    test('should read a valid input', (done) => {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG']
      let expected = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"]
      input.forEach((element, index) => {
        assert.equal(convertHandler.getUnit(element), expected[index])
      })
      done()
    })

    test('should return an error for an invalid input unit', (done) => {
      let input = ['34.5', '3.4 kilograms', '1/2miles']
      input.forEach(element => {
        assert.equal(convertHandler.getUnit(element), 'invalid unit')
      })
      done()
    })
  })

  suite('function convertHandler.getReturnUnit(initUnit)', () => {
    test('should return the correct return unit for each valid input', (done) => {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expected = ['L','gal','km','mi','kg','lbs'];
      input.forEach((element, index) => {
        assert.equal(convertHandler.getReturnUnit(element), expected[index])
      })
      done()
    })
  })

  suite('function convertHandler.spellOutUnit(unit)', () => {
    test('should return the longform of the abbreviated unit', (done) => {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expected = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"]

      input.forEach((element, index) => {
        assert.equal(convertHandler.spellOutUnit(element), expected[index])
      })
      done()
    })
  })

   suite('Function convertHandler.convert(num, unit)', function() {
    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;
      
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [5, "L"];
      let expected = 1.32086088
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [10, "mi"];
      let expected = 16.0934;
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [20, "km"];
      let expected = 12.4274547;
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [12, "lbs"];
      let expected = 5.443104;
  
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [6, "kg"];
      let expected = 13.22774652;
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
  });
});