'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

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
