'use strict';
const fs = require('fs');
const cheerio = require('cheerio');
const SeoDefectsFinder = require('./SeoDefectsFinder')

class SeoDefectsRunner {
    constructor($) {
        this.config = $;

        if ('file' == this.config['inputType']) {
            this.inputData = fs.readFileSync( $['inputFile']);
        }

        if ('stream' == this.config['inputType']) {
            this.inputStream  = $['inputStream'];
            this.inputStream.setEncoding('utf8');
            this.inputData = '';

            this.inputStream.on('data', (chunk) => {
                this.inputData += chunk;
            });

            this.inputStream.on('error', (err) => {
                reject(err);
            });
        }

    }

    findTagNumber(tagName, limit) {
        if ('stream' == this.config['inputType']) {
            return new Promise((resolve, reject) => {
                this.inputStream.on('end', () => {
                    let finder = new SeoDefectsFinder(this.config, this.inputData);
                    finder.findTagNumber(tagName, limit);
                    resolve();
                });
            });
        }
        if ('file' == this.config['inputType']) {
            let finder = new SeoDefectsFinder(this.config, this.inputData);
            finder.findTagNumber(tagName, limit);
        }
    }

    findTagAttr(tagName, attrName) {
        if ('stream' == this.config['inputType']) {
            return new Promise((resolve, reject) => {
                this.inputStream.on('end', () => {
                    let finder = new SeoDefectsFinder(this.config, this.inputData);
                    finder.findTagAttr(tagName, attrName);
                    resolve();
                });
            });
        }
        if ('file' == this.config['inputType']) {
            let finder = new SeoDefectsFinder(this.config, this.inputData);
            finder.findTagAttr(tagName, attrName);
        }
    }

    findHeadTags(){
        if ('stream' == this.config['inputType']) {
            return new Promise((resolve, reject) => {
                this.inputStream.on('end', () => {
                    let finder = new SeoDefectsFinder(this.config, this.inputData);
                    finder.findHeadTags();
                    resolve();
                });
            });
        }
        if ('file' == this.config['inputType']) {
            let finder = new SeoDefectsFinder(this.config, this.inputData);
            finder.findHeadTags();
        }
    }
}

module.exports = SeoDefectsRunner;


