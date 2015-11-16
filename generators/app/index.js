var generators = require("yeoman-generator");
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

  constructor : function(){
    generators.Base.apply(this, arguments);
    this.appName = '';
    //this.argument('appName', { type: String, required: false });
  },
  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, function (answers) {
      this.appName = answers.name;
      done();
    }.bind(this));
  },
  paths: function () {
    if(this.appName.length > 0){
      this.destinationRoot(this.appName);
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {appName: this.appName}
    );
  },
  createApp: function(){
    mkdirp.sync('src');
    mkdirp.sync('config');
    this.copy('index.html', 'index.html');
    this.copy('readme.md', 'readme.md');
    this.copy('.gitignore', '.gitignore');
    this.copy('src/app.js', 'src/app.js');
    this.copy('config/webpack.js', 'config/webpack.js');
  },
  installDependencies: function() {
    this.npmInstall(["babel", "babel-core", "babel-loader", "babel-preset-es2015", "webpack"], { 'saveDev': true });
    this.npmInstall(["debug"], { 'save': true });
  }
});
