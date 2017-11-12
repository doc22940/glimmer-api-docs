#!/usr/bin/env node

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const GIT_REPOS = [
  ['glimmer.js', 'https://github.com/glimmerjs/glimmer.js.git']
];

try {
  fs.mkdirSync('repos');
} catch (e) { }

GIT_REPOS.forEach(([repoPath, url]) => {
  let stat;
  try {
    stat = fs.statSync(path.join('repos', repoPath));
  } catch (e) {
    execSync(`git clone "${url}"`, {
      cwd: 'repos'
    });
  }
  execSync('git pull --rebase && yarn --pure-lockfile', {
    cwd: path.join('repos', repoPath)
  });
});

const NODE_BIN = path.join(__dirname, '..', 'node_modules', '.bin');

const output = execSync(NODE_BIN + '/jtd docs-source/docs-config.json');
console.log(output.toString());
