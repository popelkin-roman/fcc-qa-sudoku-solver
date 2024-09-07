'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;
      let respond;
      let rowCoordinates = 'abcdefghi';
      let inputRow = coordinate?.split('')?.[0];
      let inputCol = coordinate?.split('')?.[1];
      let row = rowCoordinates.split('').findIndex(el =>  el === inputRow?.toLowerCase());
      let column = inputCol - 1;
      
      if (! (puzzle && coordinate && value)) respond = { error: 'Required field(s) missing' }
      else if ( coordinate.split('').length !== 2
          || row < 0
          || ! isFinite(column)
          || column < 0 
          || column > 8
      ) {
        respond = { error: 'Invalid coordinate'}
      } else if (! isFinite(value)
        || value < 1 
        || value > 9
      ) {
        respond = { error: 'Invalid value' }
      } else if (solver.validate(puzzle) !== 'valid') {
        respond = {error: solver.validate(puzzle)}
      } else {
        let conflicts = []
        if (!solver.checkRowPlacement(puzzle, row, column, value)) conflicts.push('row');
        if (!solver.checkColPlacement(puzzle, row, column, value)) conflicts.push('column');
        if (!solver.checkRegionPlacement(puzzle, row, column, value)) conflicts.push('region');
        if ( conflicts.length === 0 ) respond = {valid: true}
        else respond = {valid: false, conflict: conflicts }
      }
      return res.json(respond)
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let respond
      let puzzle = req.body.puzzle;
      if (!puzzle) respond = { error: 'Required field missing' }
      else if (solver.solve(puzzle)) respond = {solution: solver.solve(puzzle)}
      else if (solver.validate(puzzle) !== 'valid') respond = { error: solver.validate(puzzle) }
      else respond = { error: 'Puzzle cannot be solved' }
      return res.json(respond)
    });
};
