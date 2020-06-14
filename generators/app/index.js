const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('appname', {
      type: String,
      required: true,
      description: '`appname` is a required argument',
    });

    // And you can then access it later; e.g.
    this.log(this.options.appname);
  }
  configuring() {}
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'projectname',
        message: 'Your Project Name',
        default: this.options.appname,
      },
      //   {
      //     type: 'input',
      //     name: 'giturl',
      //     message: 'the git repository url of Your Project',
      //     // default: this.appname,
      //   },
    ]).then((data) => {
      const { projectname, giturl } = data;
      this.log(data);
      this.data = data;
      //   this.projectName = projectname;
      //   this.gitUrl = giturl;
    });
  }

  configuring() {}

  default() {}

  writing() {
    this.log(this.options.appname);

    const templates = [
      'code/app.js',
      'notes/笔记一.md',
      'README.md',
      'requirements.md',
    ];

    templates.forEach((item) => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(`${this.options.appname}/${item}`),
        this.data
      );
    });
  }

  conflicts() {}
  install() {}
  end() {}
};
