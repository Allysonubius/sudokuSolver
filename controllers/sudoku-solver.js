class SudokuSolver {
  constructor(puzzleString, row, column, value){
    this.puzzleString = puzzleString;
    this.arrPuzzle = String( puzzleString ).split('')
    this.row = row;
    this.column = column;
    this.value = value;
    this.objRows = {
      'A':{ nn:1, pos: [0, 8], rowRegion: 1 } , 
      'B': { nn: 2, pos: [9, 17] , rowRegion: 1 }, 
      'C': { nn: 3, pos: [18, 26], rowRegion: 1  }, 
      'D': { nn: 4, pos: [27, 35] , rowRegion: 2 }, 
      'E': { nn: 5, pos: [36, 44] , rowRegion: 2 }, 
      'F': { nn: 6, pos: [45, 53] , rowRegion: 2 }, 
      'G': { nn: 7, pos : [54, 62] , rowRegion: 3 }, 
      'H': { nn: 8, pos : [63, 71] , rowRegion: 3 }, 
      'I': { nn: 9, pos: [72, 80] , rowRegion: 3 }
    };
  }

  validate() {
    
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
    let temArrJ = [];

    for(let j = 0, i = 0; j < this.puzzleString.length; j+=27, i++){
      temArrJ[i] = [];
      for(let k = j; k < j+ 27; k++){
        temArrJ[i].push(this.puzzleString[k])
      }
      
    }

    let tempArrP = []
    for(let s = 0; s < temArrJ.length; s++){
      tempArrP[s] = []
      for(let c = 0, temp=0; c < temArrJ[s].length; c+=3, temp++){
         tempArrP[s][temp] = [] 
        for(let p = c; p < c + 3; p++){
         tempArrP[s][temp].push(temArrJ[s][p]) 
        }
      }
    }

    for(let i = 0; i < tempArrP.length; i++){
      region[i] = [[],[],[]];
      for(let m = 0; m < tempArrP[i].length; m++){

        if(m % 3 == 0){
          region[i][0].push(tempArrP[i][m])
        }else if(m % 3 == 1){
          region[i][1].push(tempArrP[i][m])
        }else if(m % 3 == 2){
          region[i][2].push(tempArrP[i][m])
        }    }

      }

  
for(let i = 0; i < region.length; i++){
  for(let j = 0; j < region[i].length; j++){
    region[i][j] = region[i][j].reduce((total, amount) => {
  return total.concat(amount);
}, []);
  }
}

    region = region.reduce((total, amount) => {
  return total.concat(amount);
}, []);
    console.log(region, 'region')
      return region
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

