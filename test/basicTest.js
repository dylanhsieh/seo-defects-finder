'use strict';

const should            = require('should');
const fs                = require('fs');
const SeoDefectsFinder = require('../lib/SeoDefectsFinder');

describe('#basic', () => {
    it('case: a no rel', done => {
        const testInput = __dirname + '/data/a-no-rel.html';
        const testData = fs.readFileSync(testInput);
        const config = {
            'inputType' : 'file',
            'inputFile'  : testInput,
            'outputType' : 'console',
        };
        const finder = new SeoDefectsFinder(config, testData);
        let result = finder.findTagAttr('a', 'rel');
        result.should.equal(2);
        done();
    });

    it('case: img no alt', done => {
        const testInput = __dirname + '/data/img-no-alt.html';
        const testData = fs.readFileSync(testInput);
        const config = {
            'inputType' : 'file',
            'inputFile'  : testInput,
            'outputType' : 'console',
        };
        const finder = new SeoDefectsFinder(config, testData);
        let result = finder.findTagAttr('img', 'alt');
        result.should.equal(2);
        done();
    });

    it('case: too many strong', done => {
        const testInput = __dirname + '/data/too-many-strong.html';
        const testData = fs.readFileSync(testInput);
        const config = {
            'inputType' : 'file',
            'inputFile'  : testInput,
            'outputType' : 'console',
        };
        const finder = new SeoDefectsFinder(config, testData);
        let result = finder.findTagNumber('strong', 2);
        result.should.equal(true);
        done();
    });

    it('case: too many H1', done => {
        const testInput = __dirname + '/data/too-many-h1.html';
        const testData = fs.readFileSync(testInput);
        const config = {
            'inputType' : 'file',
            'inputFile'  : testInput,
            'outputType' : 'console',
        };
        const finder = new SeoDefectsFinder(config, testData);
        let result = finder.findTagNumber('H1', 1);
        result.should.equal(true);
        done();
    });

    it('case: head no meta', done => {
        const testInput = __dirname + '/data/head-no-meta.html';
        const testData = fs.readFileSync(testInput);
        const config = {
            'inputType' : 'file',
            'inputFile'  : testInput,
            'outputType' : 'console',
        };
        const finder = new SeoDefectsFinder(config, testData);
        let result = finder.findHeadTags();
        result.should.equal(true);
        done();
    });

});
