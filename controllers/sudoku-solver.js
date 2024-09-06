class SudokuSolver {

  validate(puzzleString) {
    return puzzleString.length === 81 
        && puzzleString.split('').every(el => isFinite(el) || el ==='.');
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let testRow = puzzleString.slice(9*row, 9*row + column) + puzzleString.slice(9*row + column + 1, 9*row + 9);
    return !testRow.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    let testCol=''
    for (let i = 0; i < 81; i+=9) {
      if (i / 9 === row) continue;
      testCol += puzzleString[i + column]
    }
    return !testCol.includes(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let testRegion='';
    let startRow = Math.floor(row/3)*3
    let startCol = Math.floor(column/3)*3
    for (let i = 0; i < 3; i++) {
      testRegion += puzzleString.slice(9*(startRow+i) + startCol, 9*(startRow+i) + startCol + 3)
    }
    return !testRegion.includes(value);
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

