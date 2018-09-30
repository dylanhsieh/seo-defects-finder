'use strict';

var fs = require("fs");
const SeoDefectsRunner = require('./lib/SeoDefectsRunner')

const testFile = __dirname + '/example.html';
let readerStream = fs.createReadStream(testFile);
const outputFile = __dirname + '/outputResult';
let writerStream = fs.createWriteStream(outputFile);
const config = {
        'inputType' : 'stream',
        'inputStream' : readerStream,
        //'inputFile'  : testFile,
        'outputType' : 'console',
        //'outputStream' : writerStream,
        //'outputFile' : 'result',
};

const runner = new SeoDefectsRunner(config);

runner.findTagAttr('a', 'rel');
runner.findTagAttr('img', 'alt');
runner.findTagNumber('strong', 15);
runner.findTagNumber('H1', 1);
runner.findHeadTags();
