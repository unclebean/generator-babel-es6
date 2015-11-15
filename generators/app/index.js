var generators = require("yeoman-generator");
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

  constructor : function(){
    generators.Base.apply(this, arguments);
    this.on('end', function () {
      this.installDependencies();
    });

  },
  createApp: function(){
    mkdirp.sync('src');
    mkdirp.sync('config');
    this.copy('_package.json', 'package.json');
    this.copy('index.html', 'index.html');
    this.copy('src/app.js', 'src/app.js');
    this.copy('config/webpack.js', 'config/webpack.js');
  }
});
