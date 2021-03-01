class SudokuSolver {
  constructor(objBody){

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

  validate(objBody) {

    let row, column, fl, col, region;

    let puzzleString = objBody.puzzle;
    let value = objBody.value;
    let validFields = objBody && objBody.puzzle &&  objBody.coordinate  && objBody.value;

    let validationResult = {row, column};

    if(/^([A-I])([1-9])$/.test(objBody.coordinate)){
      let regex = objBody.coordinate.match(/^([A-I])([1-9])$/);
      row = regex[1];
      column = regex[2];
      fl = this.checkRowPlacement(puzzleString, row, column, value);
      col = this.checkColPlacement(puzzleString, row, column, value);
      region = this.checkRegionPlacement(puzzleString, row, column, value);
      validationResult.coordinateFail = false; 
    }else{
      validationResult.coordinateFail = { error: 'Invalid coordinate'};
    }


    let collection = [
      {area: fl, name: 'row'},
      {area: col, name: 'column'},
      {area: region, name: 'region'}
    ] ;

      if(fl && col && region){
        validationResult.isValidated= {"valid": true};

      }else{
        let conflict = [];

        for(let elem of collection){
          if(!elem.area) conflict.push( elem.name )
        }

        validationResult.isValidated = { "valid": false, "conflict": conflict };
      }

        validationResult.fieldsFail = !validFields  ? { error: 'Required field(s) missing' } : false;

        validationResult.sizePuzzleFail = !puzzleString.length == 81 ? { error: 'Expected puzzle to be 81 characters long' } : false;

        validationResult.checkPuzzleFail = !puzzleString.split('').every(item => item > 0 && item < 10 || item == '.') ? { error: 'Invalid characters in puzzle' } : false;

        validationResult.valueFail = !(value > 0 && value < 10) ? { error: 'Invalid value' } : false;

    return validationResult;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let flag = true;
      for(let i = this.objRows[row]['pos'][0]; i <= this.objRows[row]['pos'][1]; i++){
        if(puzzleString[i] == value){
            flag = false;
          break
        }
      }
      return flag
  }

  checkColPlacement(puzzleString, row, column, value) {
    let flag = true;

    for(let j = column - 1; j < puzzleString.length; j += 9){
        if(puzzleString[j] == value){
            flag = false;
          break
        }
      }
    return flag
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let region = [];
    let flag = true;
    let coordinateOfRegion = [this.objRows[row]['rowRegion'],this.objCols[column-1]['colRegion']];
    
    
    for(let key in this.objRows){
      for(let otherKey in this.objCols){
        if(this.objRows[key]['rowRegion'] == this.objRows[row]['rowRegion'] && this.objCols[otherKey]['colRegion'] == this.objCols[column-1]['colRegion']){
          let positionReg = puzzleString[ this.objRows[key]['nn'] * 9 + Number( otherKey )];
          region.push(positionReg)
        }
      } 
    }

    return !region.includes(String( value ))
     
  }

  searchAreas(puzzleString, addrTd){
    let column = ( addrTd % 9 ) + 1;
    let rowNum = addrTd  / 9;
    rowNum = Math.floor(rowNum);
    let region = [];
    let letter;

    for(let keyLetter in this.objRows){
      if(this.objRows[keyLetter]['nn'] == rowNum){
        letter = keyLetter;
      }
    }

    for(let key in this.objRows){
      for(let otherKey in this.objCols){

        if(this.objRows[key]['rowRegion'] == this.objRows[letter]['rowRegion'] && this.objCols[otherKey]['colRegion'] == this.objCols[column-1]['colRegion']){
          let positionReg = puzzleString[ this.objRows[key]['nn'] * 9 + Number( otherKey )];
          region.push(positionReg)
          }
        } 
      }

    return { col: column, row:rowNum, region }
    }



  cleanCoordinates(puzzleString, candidates){

    for(let keyCandidates in candidates){
      for(let i = 0; i < candidates[keyCandidates].length; i++){
        let searchResult = searchAreas(puzzleString, )
      }
    }


    for(let key in this.objRows){
        let fl = this.checkRowPlacement(puzzleString, key, column, value);
        let col = this.checkColPlacement(puzzleString, key, column, value);
        let region = searchResult.region; 
        return fl && col && region;
        }
      }

getCandidates(puzzleString){
    let candidates = {};

    for(let i = 0; i < puzzleString.length; i++){
      if(puzzleString[i] === '.'){
        candidates[i] = [];
        let column = ( i % 9 ) + 1;
        let row = i / 9;
        row = Math.floor(row);

        for(let key in this.objRows){
          if(this.objRows[key]['nn'] == row){
            for(let j = 1; j <= 9; j++){
      let fl = this.checkRowPlacement(puzzleString, key, column, j);
      let col = this.checkColPlacement(puzzleString, key, column, j);
      let region = this.checkRegionPlacement(puzzleString, key, column, j);
      let putNum = fl && col && region;
              if( fl && col && region){
                candidates[i].push(j);
              }
            }
          }
        }
      }
    }
  return candidates
}

 

  repeatFuncCleaning(puzzleStr){
      let candidates = this.getCandidates(puzzleStr);
      let puzzleArr = puzzleStr.split('');

      let flag = true;

        for(let key in candidates){

          if(candidates[key].length == 1){
            puzzleArr[key] = candidates[key][0];
            flag = false;
          }
        }

      puzzleStr = puzzleArr.join('')

      if(!flag){
       puzzleStr = this.repeatFuncCleaning(puzzleStr)
        return puzzleStr;
      }else{
        console.log(puzzleStr, 'puzzle2')
        return puzzleStr; 
      }

    }


  solve(puzzleString) {
    puzzleString = this.repeatFuncCleaning(puzzleString) ;
    let puzzleArr = puzzleString.split('') ;

   return puzzleArr 


  }

}

module.exports = SudokuSolver;

