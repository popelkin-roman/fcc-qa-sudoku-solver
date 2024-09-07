const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('Test valid puzzle string POST /api/solve ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/solve')
          .send({
            puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'solution', 'response should contain solution property');
            assert.equal(res.body.solution, '568913724342687519197254386685479231219538467734162895926345178473891652851726943', 'solution is correct');
            done();
        });
    });
    test('Test missing puzzle string POST /api/solve ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/solve')
          .send({
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error property');
            assert.equal(res.body.error, 'Required field missing', 'text of error is correct');
            done();
        });
    });
    test('Test invalid chars puzzle string POST /api/solve ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/solve')
          .send({
            puzzle: '5..91372.3...D.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error property');
            assert.equal(res.body.error, 'Invalid characters in puzzle', 'text of error is correct');
            done();
        });
    });
    test('Test shorter puzzle string POST /api/solve ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/solve')
          .send({
            puzzle: '5..91372.3...5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error property');
            assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'text of error is correct');
            done();
        });
    });
    test('Test puzzle cannot be solved string POST /api/solve ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/solve')
          .send({
            puzzle: '55.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error property');
            assert.equal(res.body.error, 'Puzzle cannot be solved', 'text of error is correct');
            done();
        });
    });
    test('Test all fields POST /api/check ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/check')
          .send({
            puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            coordinate: 'A4',
            value: '9'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'valid', 'response should contain valid property');
            assert.isTrue(res.body.valid, 'valid is true');
            done();
        });
    });
    test('Test vallue with one conflict POST /api/check ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/check')
          .send({
            puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            coordinate: 'A3',
            value: '4'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'valid', 'response should contain valid property');
            assert.property(res.body, 'conflict', 'response should contain conflict property');
            assert.isArray(res.body.conflict, 'conflict property should be an array');
            assert.equal(res.body.conflict[0], 'column', 'conflict property should be column');
            assert.isFalse(res.body.valid, 'valid is false');
            done();
        });
    });
    test('Test vallue with multiple conflicts POST /api/check ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/check')
          .send({
            puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            coordinate: 'A3',
            value: '5'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'valid', 'response should contain valid property');
            assert.property(res.body, 'conflict', 'response should contain conflict property');
            assert.isArray(res.body.conflict, 'conflict property should be an array');
            assert.equal(res.body.conflict.length, 2, 'conflict is array of two elements');
            assert.isFalse(res.body.valid, 'valid is false');
            done();
        });
    });
    test('Test vallue with all conflicts POST /api/check ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/check')
          .send({
            puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            coordinate: 'A3',
            value: '9'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'valid', 'response should contain valid property');
            assert.property(res.body, 'conflict', 'response should contain conflict property');
            assert.isArray(res.body.conflict, 'conflict property should be an array');
            assert.equal(res.body.conflict.length, 3, 'conflict is array of three elements');
            assert.isFalse(res.body.valid, 'valid is false');
            done();
        });
    });
    test('Test missing field POST /api/check ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/check')
          .send({
            puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            value: '9'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error property');
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
        });
    });
    test('Test invalid characters POST /api/check ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/check')
          .send({
            puzzle: '5..913c2.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            coordinate: 'A3',
            value: '9'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error property');
            assert.equal(res.body.error, 'Invalid characters in puzzle', 'text of error is correct');
            done();
        });
    });
    test('Test longer puzzle POST /api/check ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/check')
          .send({
            puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...333',
            coordinate: 'A3',
            value: '9'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error property');
            assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'text of error is correct');
            done();
        });
    });
    test('Test invalid placement coordinat POST /api/check ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/check')
          .send({
            puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            coordinate: 'Y3',
            value: '9'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error property');
            assert.equal(res.body.error, 'Invalid coordinate', 'text of error is correct');
            done();
        });
    });
    test('Test invalid value POST /api/check ', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/check')
          .send({
            puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
            coordinate: 'A3',
            value: 'C'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error property');
            assert.equal(res.body.error, 'Invalid value', 'text of error is correct');
            done();
        });
    });
});

