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

## Contributing

Fork and extend our library and make it great.

## Release History

* 0.1.0 Initial release
