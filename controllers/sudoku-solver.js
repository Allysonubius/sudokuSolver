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

    let validFields = objBody && objBody.puzzle &&  objBody.coordinate  && objBody.value;

    let validationResult = {row, column};
    

    let  shortErr = !validFields  ? 'Required field(s) missing'  : !( /^([A-I])([1-9])$/.test(objBody.coordinate)  )? 'Invalid coordinate' :  !( objBody.puzzle.length == 81 ) ? 'Expected puzzle to be 81 characters long' : !objBody.puzzle.split('').every(item => item > 0 && item < 10 || item == '.') ? 'Invalid characters in puzzle'  : !(objBody.value > 0 && objBody.value < 10) ? 'Invalid value': false ; 
 
    if(/^([A-I])([1-9])$/.test(objBody.coordinate)){

      let regex = objBody.coordinate.match(/^([A-I])([1-9])$/);
      row = regex[1];
      column = regex[2];

    }
    
    if(!shortErr){
      fl = this.checkRowPlacement(objBody.puzzle, row, column, objBody.value);
      col = this.checkColPlacement(objBody.puzzle, row, column, objBody.value);
      region = this.checkRegionPlacement(objBody.puzzle, row, column, objBody.value);

    let collection = [
      {area: fl, name: 'row'},
      {area: col, name: 'column'},
      {area: region, name: 'region'}
    ] ;

     if(fl && col && region || this.ifContainsTheSame(objBody.puzzle, row, column, objBody.value)){
        validationResult.answer= {"valid": true};
      }else{
        let conflict = [];
        for(let elem of collection){
          if(!elem.area) conflict.push( elem.name )
        }
      validationResult.answer = { "valid": false, "conflict": conflict };

      }

    }else{
      validationResult.error = shortErr;
    }
    console.log(validationResult, 'valRes')
    return validationResult;
  }

  
  ifContainsTheSame(puzzle, row, col, value){
    let rowNum = this.objRows[row]['nn'] ;
    let addrTd =  ( ( rowNum ) * 9 + Number( col )  ) - 1;
    console.log(addrTd, 'addrTd', rowNum, 'rowNumb', col, 'col')
    return puzzle[addrTd] == value
  }


  checkRowPlacement(puzzleString, row, column, value){
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

 searchAreas(puzzleString, addrTd){
    let column = ( addrTd % 9 ) + 1;
    let rowNum = addrTd  / 9;
    rowNum = Math.floor(rowNum);
    let region = [];
    let letter;
   let fullListElems = {rowEl: [], columnEl: [], regionEl: []};
   
    for(let keyLetter in this.objRows){
      if(this.objRows[keyLetter]['nn'] == rowNum){
        letter = keyLetter;
      }
    }

   let rowArea = this.objRows[letter]['pos'];

   for(let i = rowArea[0]; i <= rowArea[1] ; i++ ){
    fullListElems.rowEl.push(puzzleString[i]) ;
   }
   
   for(let j = column - 1; j < puzzleString.length; j += 9){
     fullListElems.columnEl.push(puzzleString[j])
      }
 

    for(let key in this.objRows){
      for(let otherKey in this.objCols){
        if(this.objRows[key]['rowRegion'] == this.objRows[letter]['rowRegion'] && this.objCols[otherKey]['colRegion'] == this.objCols[column-1]['colRegion']){
          let positionReg = puzzleString[ this.objRows[key]['nn'] * 9 + Number( otherKey )];
          fullListElems.regionEl.push(positionReg)
          region.push(positionReg)
          }
        }
      }
    return fullListElems;
    }

callbackFilter(value, index, self){
  return self.indexOf(value) === index || value == '.';
}

checkCollections(puzzle){
  let flag = true;
  
  for(let i = 0; i < puzzle.length; i++){
    let collection = this.searchAreas(puzzle, i) ;
    let uniqueRow = collection.rowEl.filter(this.callbackFilter); 
    let uniqueCol = collection.columnEl.filter(this.callbackFilter); 
    let uniqueRegion = collection.regionEl.filter(this.callbackFilter); 

      if( !(uniqueRow.length == collection.rowEl.length && uniqueCol.length == collection.columnEl.length && uniqueRegion.length == collection.regionEl.length) ){
      flag = false;
      break;
    }
  }

  return flag;
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

      return puzzleStr; 

    }
  }


  solve(objBody) {
    let answer = {};
    let puzzleString;
    if(objBody.hasOwnProperty('puzzle')){
      console.log(this.searchAreas(objBody.puzzle, 5), 'search')
      console.log(this.checkCollections(objBody.puzzle), 'checColl')
      puzzleString = objBody.puzzle;
      puzzleString = this.repeatFuncCleaning(puzzleString) ;
    //console.log(!(puzzleString.indexOf('.') == -1) || !this.checkSolvingPuzzle(objBody.puzzle), 'checking')
    }
    
    let err = !objBody.hasOwnProperty('puzzle')  ? 'Required field missing'  :  !( objBody.puzzle.length == 81 ) ? 'Expected puzzle to be 81 characters long' : !objBody.puzzle.split('').every(item => item > 0 && item < 10 || item == '.') ? 'Invalid characters in puzzle'  : !(puzzleString.indexOf('.') == -1) || !this.checkCollections(objBody.puzzle) ?  'Puzzle cannot be solved' : false ; 

    if(!err){
      answer.solution = puzzleString;
    }else{
      answer.error = err
      console.log(err, 'err')
    }

     // console.log(puzzleString, 'str')
   return answer 
  }

}

module.exports = SudokuSolver;

