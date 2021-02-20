'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

module.exports = function (app) {
  

  app.route('/api/check')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      let regex = req.body.coordinate.match(/(^[A-I])([1-9])$/)
      let solver = new SudokuSolver(puzzleString, regex[1], regex[2], req.body.value);
      //console.log(req.body, 'req.body')
      //console.log(regex, 'regex')
      //console.log(regex[1], '1')
      let fl = solver.checkRowPlacement();
      let col = solver.checkColPlacement();
      let region = solver.checkRegionPlacement()
      console.log(fl, 'fl')
      console.log(col, 'col')
      console.log(region, 'reg')
    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
