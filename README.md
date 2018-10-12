# node-seo-defects

scan a HTML file and show all of the SEO defects.

## Usage

```javascript
const SeoDefectsRunner = require('./lib/SeoDefectsRunner');
const inputFile = __dirname + '/example.html';
const config = {
        'inputType' : 'file', 
        'inputFile'  : inputFile,
        'inputStream' : null,
        'outputType' : 'console',
        'outputStream' : null,
        'outputFile' : null,
};

const runner = new SeoDefectsRunner(config);

runner.findTagAttr('a', 'rel');
runner.findTagAttr('img', 'alt');
runner.findTagNumber('strong', 15);
runner.findTagNumber('H1', 1);
runner.findHeadTags();
```
## Output sample
```
there are 2 <a> tag without attr "rel"
there are 1 <img> tag without attr "alt"
there are more than 15 <strong> tag
there are more than 1 <H1> tag
there is no title  in head
there is no meta keywords in head
there is no meta descriptions in head
```
## Config
```
config
    inputType:
        file : HTML file (User is able to config the input path)
        stream : Node Readable Stream
    inputFile: HTML path 
    inputStream: a readable stream
    outputType:
        file : Output to file
        stream : Node writable Stream
    console : Console
    outputStream: Node Writeable Stream
    outputFile: output file path
```
## Methods
```javascript
// check if there is a tag without specific attribute
findTagAttr('a', 'rel'); // check if there is a a tag without rel attribute
findTagAttr('img', 'alt'); // check if there is a img tag without alt attribute

// check if there are too many tags in html
findTagNumber('strong', 15); // check if there are more than 15 strong tag in html
findTagNumber('H1', 1); // check if there are more than 1 H1 tag in html

// check head tags
findHeadTags();
i. Detect if header doesn’t have <title> tag
ii. Detect if header doesn’t have <meta name=“descriptions” ... /> tag
iii. Detect if header doesn’t have <meta name=“keywords” ... /> tag

```

## Test
```
npm test
```
