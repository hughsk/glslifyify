var combine = require('stream-combiner')
  , glslify = require('glslify-stream')
  , deparser = require('glsl-deparser')
  , wrap = require('wrap-stream')
  , through = require('through')
  , path = require('path')
  , fs = require('fs')

module.exports = glslifyify

function noop(){}

function glslifyify(file) {
  if (!/\.(?:glsl|vert|frag|geom|(?:[vgf](?:s|sh|shader)))$/g.test(file))
    return through()

  // Get transforms from the nearest package.json
  var package_json = {}
  var cwd = file
  do {
    cwd = path.resolve(cwd, '..')
    if (fs.readdirSync(cwd).indexOf('package.json') !== -1) {
      package_json = require(cwd + '/package.json')
      break
    }
  } while(cwd.split(path.sep).length > 2)

  var input = glslify(file, {
      transform: package_json.glslifyify || []
    , input: true
  })

  return combine(
      input
    , deparser(true)
    , through(write)
    , wrap('module.exports = "', '"')
  )

  function write(data) {
    data = String(data)
      .replace(/\"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')

    this.queue(data)
  }
}
