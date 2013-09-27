var glslify = require('glslify-stream')
  , deparser = require('glsl-deparser')
  , through = require('through')
  , path = require('path')
  , fs = require('fs')

module.exports = glslifyify

function noop(){}

function glslifyify(file) {
  if (!/\.(?:glsl|vert|frag|geom|(?:[vgf](?:s|sh|shader)))$/g.test(file))
    return through()

  // Currently ignores the input stream
  // and just reads the file passed to
  // the transform directly :(
  //
  // Should be fixed in "the future".
  var unprefixed = true
  var out = through(noop, noop)
  var stream = glslify(file)
    .pipe(deparser(true))
    .pipe(through(write, end))

  return out

  function write(data) {
    if (unprefixed) {
      out.queue('module.exports = "')
      unprefixed = false
    }

    data = String(data)
      .replace(/\"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')

    out.queue(data)
  }

  function end() {
    out.queue('"')
    out.queue(null)
  }
}
