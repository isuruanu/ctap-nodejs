ctap-nodejs
=========

A library providing a framework for hsenid mobile telco application platform.

## Installation

  npm install ctap --save

## Usage

  var ctap = require('ctap')
      escape = ctap.escape,
      unescape = ctap.unescape;

  var html = '<h1>Hello World</h1>',
      escaped = escape(html),
      unescaped = unescape(escaped);

  console.log('html', html, 'escaped', escaped, 'unescaped', unescaped);

## Tests

  npm test

## IDE support
* Eclipse
  To create eclipse project files 
	1. Install with npm install -g nodeclipse
	2. Usage: just run nodeclipse -p to add needed .project file to current directory
	3. In Eclipse File -> Import -> General / Existing Projects into Workspace

## Contributing

Fork and extend our library and make it great.

## Release History

* 0.1.0 Initial release
