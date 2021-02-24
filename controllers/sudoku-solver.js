class SudokuSolver {
  constructor(objBody){
    let regex = objBody ? objBody.coordinate.match(/^([A-I])([1-9])$/) : '';
    this.row = regex ? regex[1] : '';
    this.column = regex ? regex[2] : '';
    this.puzzleString = objBody && objBody.puzzle ? objBody.puzzle : '';
    this.arrPuzzle = String( this.puzzleString ).split('')
    this.value = objBody && objBody.value ? objBody.value : '';
    this.validFields = objBody && objBody.puzzle &&  objBody.coordinate  && objBody.value;

    this.objRows = {
      'A':{ nn:0, pos: [0, 8], rowRegion: 1} , 
      'B': { nn: 1, pos: [9, 17] , rowRegion: 1 }, 
      'C': { nn: 2, pos: [18, 26], rowRegion: 1  }, 
      'D': { nn: 3, pos: [27, 35] , rowRegion: 2 }, 
      'E': { nn: 4, pos: [36, 44] , rowRegion: 2 }, 
      'F': { nn: 5, pos: [45, 53] , rowRegion: 2 }, 
      'G': { nn: 6, pos : [54, 62] , rowRegion: 3 }, 
      'H': { nn: 7, pos : [63, 71] , rowRegion: 3 }, 
      'I': { nn: 8, pos: [72, 80] , rowRegion: 3 }
    };

    this.objCols = {
      0: {colRegion: 1} ,
      1: {colRegion: 1} ,
      2: {colRegion: 1} ,
      3: {colRegion: 2} ,
      4: {colRegion: 2} ,
      5: {colRegion: 2} ,
      6: {colRegion: 3} ,
      7: {colRegion: 3} ,
      8: {colRegion: 3} 
    }

 }

  validate() {

    let validationResult = {}

    let fl = this.checkRowPlacement();
    let col = this.checkColPlacement();
    let region = this.checkRegionPlacement();

    let collection = [
      {area: fl, name: 'row'},
      {area: col, name: 'column'},
      {area: region, name: 'region'}
    ] ;

      if(fl && col && region){
        validationResult.validatedTrue = {"valid": true};
      }else{
        let conflict = [];

        for(let elem of collection){
          if(!elem.area) conflict.push( elem.name )
        }

        validationResult.validatedTrue = { "valid": false, "conflict": conflict };
      }

        validationResult.fields = !this.validFields  ? { error: 'Required field(s) missing' } : true;

        validationResult.sizePuzzle = !this.puzzleString.length == 81 ? { error: 'Expected puzzle to be 81 characters long' } : true;
        validationResult.checkPuzzle = !this.puzzleString.split('').every(item => item > 0 && item < 10 || item == '.') ? { error: 'Invalid characters in puzzle' } : true;



    validationResult.value = !(this.value > 0 && this.value < 10) ? { error: 'Invalid value' } : true;
    validationResult.coordinate = !/^[A-I]$/.test(this.row) || !/^[1-9]$/.test(this.column) ? { error: 'Invalid coordinate'} : true;

    console.log(validationResult, 'validResult')
    return validationResult;
  }

  checkRowPlacement() {
    let flag = true;
      for(let i = this.objRows[this.row]['pos'][0]; i <= this.objRows[this.row]['pos'][1]; i++){
        if(this.puzzleString[i] == this.value){
            flag = false;
          break
        }
      }
      return flag
  }

  checkColPlacement() {
    let flag = true;

    for(let j = this.column - 1; j < this.puzzleString.length; j += 9){
        if(this.puzzleString[j] == this.value){
            flag = false;
          break
        }
      }
    return flag
  }

  checkRegionPlacement() {
    let region = [];
    let flag = true;
    let coordinateOfRegion = [this.objRows[this.row]['rowRegion'],this.objCols[this.column-1]['colRegion']];
    
    
    for(let key in this.objRows){
      for(let otherKey in this.objCols){
        if(this.objRows[key]['rowRegion'] == this.objRows[this.row]['rowRegion'] && this.objCols[otherKey]['colRegion'] == this.objCols[this.column-1]['colRegion']){
          let positionReg = this.puzzleString[ this.objRows[key]['nn'] * 9 + Number( otherKey )];
          region.push(positionReg)
        }
      } 
    }

    return !region.includes(this.value)
     
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

