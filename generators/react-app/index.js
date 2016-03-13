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
        mkdirp.sync('src/containers');
        this.copy('index.html', 'index.html');
        this.copy('readme.md', 'readme.md');
        this.copy('server.js', 'server.js');
        this.copy('.gitignore', '.gitignore');
        this.copy('src/app.js', 'src/app.js');
        this.copy('src/routes.js', 'src/routes.js');
        this.copy('src/.babelrc', 'src/.babelrc');
        this.copy('src/containers/main.js', 'src/containers/main.js');
        this.copy('config/webpack.config.js', 'config/webpack.config.js');
    },
    installDependencies: function() {
        this.npmInstall(["babel", "babel-core", "babel-loader", "babel-preset-es2015", "babel-preset-react", "react-hot-loader", "webpack", "webpack-dev-server"], { 'saveDev': true });
        this.npmInstall(["react", "react-dom", "react-router"], { 'save': true });
        this.npmInstall(["debug"], { 'save': true });
        /*
         this.installDependencies({
         bower: false,
         npm: true,
         skipInstall: this.options['skip-install'],
         callback: function () {
         console.log('Enjoy ES6 project!');
         }
         });
         */
    }
});


