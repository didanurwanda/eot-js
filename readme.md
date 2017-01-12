# EOT-JS
Javascript heredoc syntax for create a multiline string

### Install

NPM `npm install eot-js --save`

Bower `bower install eot-js --save`

Download [here](https://github.com/didanurwanda/eot-js/archive/master.zip)

### How to use

```javascript
var eot = require('eot-js');
var template = eot(function() {
	/*EOT
	
// your string here
	
	EOT*/
));

console.log(template);
```

### Template engine integration
EOT-JS default support template engine

* [Mustache](https://github.com/janl/mustache.js)
* [Handlebars](http://handlebarsjs.com)
* [EJS <% Embedded JavaScript %>](http://www.embeddedjs.com)
* [Underscore](http://underscorejs.org/#template)
* Parser (change {string} to string with data)

```javascript
var eot = require('eot-js');
var engine = require('your-template-engine');
var config = {
	templateEngine: 'engine-name',
	engine: engine, // context
};
var data = {
	name: 'Dida Nurwanda'
}

var template = eot(function() {
	/*EOT
Hallo {name}
	EOT*/
}, config, data);

// output
Hallo Dida Nurwanda
```

##### config api
- templateEngine - template engine name
- engine - template engine context
- engineOptions - template engine options
- format - output format `text` or `javascript`
- trim - trim output

## Contributor
Dida Nurwanda

* [http://www.didanurwanda.com](http://www.didanurwanda.com)
* [Blog](http://blog.didanurwanda.com)
* [Github Repository](https://github.com/didanurwanda?tab=repositories)
* [NPM](https://www.npmjs.com/~didanurwanda)
* [Twitter](https://www.twitter.com/didanurwanda)