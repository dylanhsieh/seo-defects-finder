'use strict';
const fs = require('fs');
const cheerio = require('cheerio');

class SeoDefectsFinder {
    constructor($, inputData) {
        this.outputType   = $['outputType'];
        this.outputFile   = $['outputFile'];
        this.outputStream = $['outputStream'];
        this.$ = cheerio.load(inputData);
    }

    findTagNumber(tagName, limit) {
        const $ = this.$;

        if (limit < $(tagName).length) {
            this.output(`there are more than ${limit} <${tagName}> tag`);
            return true
        }

        return false;
    }

    findTagAttr(tagName, attrName) {
        const $ = this.$;
        let count = 0;

        $(tagName).each(function(){
            if (undefined === $(this).attr(attrName)) {
                count++;
            }
        });

        this.output(`there are ${count} <${tagName}> tag without attr "${attrName}"`);

        return count;
    }

    findHeadTags(){
        const $ = this.$;
        let count = 0;
        let tagObjsAry = [
            {'type':'title', 'name':''},
            {'type':'meta', 'name' : 'keywords'},
            {'type':'meta', 'name' : 'descriptions'},
        ];

        for (let key in tagObjsAry) {
            let tagType = tagObjsAry[key]['type'];
            let tagName = tagObjsAry[key]['name'];

            if ( 1 > this.findHeadTagAttr($, tagType, tagName)) {
                this.output(`there is no ${tagType} ${tagName} in head`);
                count ++;
            }
        }

        if (count > 0 ) {
            return true;
        }

        return false;
    }

    findHeadTagAttr(data, tagName, metaName) {
        const $ = data;
        let metaNameStr = '';

        if ('' !== metaName) {
            metaNameStr = `[name='${metaName}']`;
        }

        let matches = $(`head ${tagName}${metaNameStr}`);

        return matches.length;
    }

    output(string) {
        let outputFunction = {
            console: function(string) {
                console.log(string);
            },
            file: function(string) {
                fs.appendFile(this.outputFile, `\n${string}`, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            },
            stream: function(string) {
                this.outputStream.write(`\n${string}`,'utf8', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        };

        outputFunction[this.outputType](string);
    }
}

module.exports = SeoDefectsFinder;


