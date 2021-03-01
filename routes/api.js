'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      /*
      let puzzleString = req.body.puzzle;
      let regex = req.body.coordinate.match(/(^[A-I])([1-9])$/)
      let solver = new SudokuSolver(puzzleString, regex[1], regex[2], req.body.value);

*/



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
      let solve = {};
      solve.solution= solver.solve(req.body.puzzle);
      console.log(solve, 'solve')
      //res.json(solve)

    });
};
