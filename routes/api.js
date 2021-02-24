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

      let solver = new SudokuSolver(req.body);

      let fl = solver.checkRowPlacement();
      let col = solver.checkColPlacement();
      let region = solver.checkRegionPlacement();
      let validate = solver.validate();

      console.log(req.body, 'req.body')
      console.log(fl, 'fl')
      console.log(col, 'col')
      console.log(region, 'reg')

      if(validate.fields){
        if(validate.sizePuzzle){
            if(validate.checkPuzzle){
              if(validate.coordinate){
                if(validate.value){
                  res.json(validate.validatedTrue);
                }else{
                  res.json(validate.value);
                }
              }else{
                res.json(validate.coordinate);
              }
            }else{
              res.json(validate.checkPuzzle);
            }
        }else{
          res.json(validate.sizePuzzle);
        }
      }else{
        res.json(validate.fields);
      }

    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
