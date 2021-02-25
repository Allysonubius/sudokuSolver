'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

function puzzleValidation(puzzle){
  for(let i = 0; i < puzzle.length; i++){
    
  }
}

module.exports = function (app) {
  
  app.route('/api/check')
    .post((req, res) => {
      /*
      let puzzleString = req.body.puzzle;
      let regex = req.body.coordinate.match(/(^[A-I])([1-9])$/)
      let solver = new SudokuSolver(puzzleString, regex[1], regex[2], req.body.value);

*/


      let solver = new SudokuSolver();

      let validate = solver.validate(req.body);

      console.log(req.body, 'req.body')
      console.log(validate, 'validate')

      if(!validate.fieldsFail){
        if(!validate.sizePuzzleFail){
            if(!validate.checkPuzzleFail){
              if(!validate.coordinateFail){
                if(!validate.valueFail){
                  res.json(validate.isValidated);
                }else{
                  res.json(validate.valueFail);
                }
              }else{
                res.json(validate.coordinateFail);
              }
            }else{
              res.json(validate.checkPuzzleFail);
            }
        }else{
          res.json(validate.sizePuzzleFail);
        }
      }else{
        res.json(validate.fieldsFail);
      }

    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
