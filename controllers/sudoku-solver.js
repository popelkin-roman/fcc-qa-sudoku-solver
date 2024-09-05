class SudokuSolver {

  validate(puzzleString) {
    return puzzleString.length === 81 
        && puzzleString.split('').every(el => isFinite(el) || el ==='.');
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

