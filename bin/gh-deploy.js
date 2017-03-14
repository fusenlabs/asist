#! /usr/bin/env node

var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
function puts(error, stdout, stderr) {
  if (stderr) {
    console.error(stderr);
    return;
  }
  console.log(stdout);
}

var fs = require('fs');
var dir = './deploy';
var bootCommands = [
  'cd deploy/',
  'git clone -b gh-pages git@github.com:fusenlabs/asist.git .'
].join(' && ');

var deployCommands = [
  'cd deploy/',
  'cp -r ../public/* .',
  'git add -A',
  'git commit -m "gh-pages update"',
  'git push origin gh-pages --force'
  // 'rm -r ../public/dist'
].join(' && ');


if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  exec(bootCommands, puts);
  console.log("WARNING!!! This time the process boot-up the folder and repo.");
  console.log("Please run again `npm run gh-deploy` to finally publish the content");
} else {
  exec(deployCommands, puts);

  var log = [];
  for (var el in log) { console.log(log[el]); }
}


/*

var gitCommands = [
    'git add --force public/',
    'git commit -m "gh-pages update"',
    'git subtree push --prefix public origin gh-pages',
    'git rm --cached -r public/dist',
    'git reset --soft HEAD~'
].join(' && ');

exec(gitCommands, puts);*/
