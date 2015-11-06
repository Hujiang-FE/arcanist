#!/usr/bin/env node

var spawn = require('cross-spawn');
var path = require('path');

var arcanist = path.join(__dirname, 'arcanist', 'scripts', 'arcanist.php');
var args = process.argv.slice(2);

if (require('os').platform() === 'win32') {
  spawn('php', ['-f', arcanist, '--'].concat(args), {stdio: 'inherit'});
} else {
  spawn(arcanist, args, {stdio: 'inherit'});
}

