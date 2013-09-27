# glslifyify [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

A browserify transform stream for
[Chris Dickinson](http://github.com/chrisdickinson)'s
[glslify](http://github.com/chrisdickinson/glslify).

Works just the same, however instead of compiling using a separate
CLI tool you can just `require('./some-shader.glsl')` and have it
return a bundled shader string.

[![glslifyify](https://nodei.co/npm/glslifyify.png?mini=true)](https://nodei.co/npm/glslifyify)

## Usage ##

``` bash
browserify index.js -t glslifyify > bundle.js
```
