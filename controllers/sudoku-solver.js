class SudokuSolver {

  validate(puzzleString) {
    if ( puzzleString.length === 81 
        && puzzleString.split('').every(el => isFinite(el) || el ==='.')) return 'valid';
    else if (!puzzleString.split('').every(el => isFinite(el) || el ==='.')) return 'Invalid characters in puzzle'
    else return 'Expected puzzle to be 81 characters long';
     
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
      let currentRow = startRow + i;
      if (currentRow == row) testRegion += puzzleString.slice(9*currentRow + startCol, 9*currentRow + column) + 
                                           puzzleString.slice(9*currentRow + column + 1, 9*currentRow + startCol + 3)
      else testRegion += puzzleString.slice(9*currentRow + startCol, 9*currentRow + startCol + 3)
    }
    return !testRegion.includes(value);
  }

  solve(puzzleString) {
    if (this.validate(puzzleString) !== 'valid') return false;
    let solutions = [puzzleString];
    let result = false;
    let checkPlacement = (puzzleString, row, column, value) => {
      return this.checkRowPlacement(puzzleString, row, column, value)
        && this.checkColPlacement(puzzleString, row, column, value)
        && this.checkRegionPlacement(puzzleString, row, column, value)
    }
    
    for (let index=0; index<puzzleString.length; index++) {
      for (let solLine = 0; solLine < solutions.length; solLine++) {
        if (solutions[solLine][index] === '.') {
          let values = getValues(solutions[solLine], index);
          let newLines = values.map( val => solutions[solLine].slice(0, index) + val + solutions[solLine].slice(index+1))
          solutions = [...solutions.slice(0, solLine), ...newLines, ...solutions.slice(solLine+1)]
          if (newLines.length === 0) solLine--;
        }
      }
    }

    solutions.forEach(el => {
      if (!el.includes('.')) result = el;
    })
    for (let i=0; i < result.length; i++) {
      if (!checkPlacement(result, getRow(i), getCol(i), result[i])) return false;
    }
    return result

    function getValues(puzzleString, index) {
      let result = []
      for (let i = 1; i <= 9; i++) {
        if (checkPlacement(puzzleString, getRow(index), getCol(index), i)) {
          result.push(i)
        }
      }
      return result
    }
    function getRow(index) {
      return Math.floor(index / 9);
    }
    function getCol(index) {
      return index % 9;
    }


  }
}

module.exports = SudokuSolver;

