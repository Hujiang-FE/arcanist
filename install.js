var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');
var Download = require('download');

var BASE = 'http://7rylsh.com1.z0.glb.clouddn.com/arc/';
var LATEST = fs.readFileSync(path.join(__dirname, 'latest'), {encoding: 'utf-8'}).trim();

var FILES = ['arcanist', 'libphutil'].map(function (k) { return BASE + k + '-' + LATEST + '.tar.gz'; });
var BACKUP_GIT_URLS = [
  'https://github.com/phacility/arcanist.git',
  'https://github.com/phacility/libphutil.git'
];


FILES.forEach(function (file, i) {
  console.log('Start download file ' + file);
  new Download({extract: true})
    .get(file)
    .dest(__dirname)
    .run(function (err) {
      if (err) {
        var source = BACKUP_GIT_URLS[i];
        console.log('Error download file ' + file + ', fallback to using git clone from original source ' + source);
        gitClone(source);
      } else {
        console.log('Success download file ' + file);
      }
    });
});



function gitClone (source) {
  spawn('git', ['clone', source], {stdio: 'inherit'});
}
