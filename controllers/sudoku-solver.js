class SudokuSolver {

  validate(puzzleString) {
    return puzzleString.length === 81 
        && puzzleString.split('').every(el => isFinite(el) || el ==='.');
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let sudokuRows = [];
    let testRow=''
    for (let i = 0; i < 9; i++) {
      let row = puzzleString.slice( 9 * i, 9 * i + 9);
      sudokuRows.push(row);
    }
    testRow=sudokuRows[row].slice(0, column) + sudokuRows[row].slice(column + 1);
    return !testRow.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

