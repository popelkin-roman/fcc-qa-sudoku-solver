const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let validPuzzle='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
let solution='135762984946381257728459613694517832812936745357824196473298561581673429269145378'
let invalidPuzzle='1.5..2.84..63.d2.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
let shortPuzzle='1.5..2.2.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'

suite('Unit Tests', () => {
    //#1
    test('Valid puzzle string', function() {
        assert.equal(solver.validate(validPuzzle), 'valid');
    });

    //#2
    test('Puzzle string with invalid characters', function() {
        assert.equal(solver.validate(invalidPuzzle), 'Invalid characters in puzzle');
    });

    //#3
    test('Not 81 characters string', function() {
        assert.equal(solver.validate(shortPuzzle), 'Expected puzzle to be 81 characters long');
    });

    //#4
    test('Valid row placement', function() {
        assert.isTrue(solver.checkRowPlacement(validPuzzle, 0, 1, 9));
    });

    //#5
    test('Invalid row placement', function() {
        assert.isFalse(solver.checkRowPlacement(validPuzzle, 0, 1, 4));
    });

    //#6
    test('Valid column placement', function() {
        assert.isTrue(solver.checkColPlacement(validPuzzle, 0, 1, 4));
    });

    //#7
    test('Invalid column placement', function() {
        assert.isFalse(solver.checkColPlacement(validPuzzle, 0, 1, 7));
    });

    //#8
    test('Valid region placement', function() {
        assert.isTrue(solver.checkRegionPlacement(validPuzzle, 0, 1, 4));
    });

    //#9
    test('Invalid region placement', function() {
        assert.isFalse(solver.checkRegionPlacement(validPuzzle, 0, 1, 6));
    });

    //#10
    test('Valid puzzle strings pass the solver', function() {
        assert.isOk(solver.solve(validPuzzle));

    });

    //#11
    test('Invalid puzzle strings fail the solver', function() {
        assert.isFalse(solver.solve(invalidPuzzle));
    });

    //#12
    test('Expected solution for incomplete puzzle', function() {
        assert.equal(solver.solve(validPuzzle), solution)
    });
});
