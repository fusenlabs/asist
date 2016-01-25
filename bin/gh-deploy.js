#! /usr/bin/env node

var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
  if (stderr) {
    console.error(stderr);
    return;
  }
  console.log(stdout);
}

var gitCommands = [
    'git add --force public/',
    'git commit -m "gh-pages update"',
    'git subtree push --prefix public origin gh-pages'
].join(' && ');

exec(gitCommands, puts);
