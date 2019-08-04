// diff eslint
/* eslint-disable no-process-exit */
const exec = require('child_process').exec;
const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine({});
const GITDIFF = 'git diff HEAD --name-only --cached';

exec(GITDIFF, (error, stdout) => {
    if (error) {
        console.error(`exec error: ${error}`);
    }
    const diffFileArray = stdout.split('\n').filter((diffFile) => (
        /(\.js|\.vue)(\n|$)/gi.test(diffFile)
    ));
    if (diffFileArray.length > 0) {
        console.log('待检查文件');
        console.log(diffFileArray);
        let errorCount = 0;
        let warningCount = 0;
        const eslintResults = cli.executeOnFiles(diffFileArray).results;
        eslintResults.forEach((result) => {
            errorCount += result.errorCount;
            warningCount += result.warningCount;
        });
        if (errorCount >= 1) {
            console.log('\x1b[31m', `ESLint error`);
            console.log('\x1b[36m', `✖ ${errorCount + warningCount} problems(${errorCount} error, ${warningCount} warning)`);
            console.log('\x1b[31m', `Please use "npm run eslint:fix" before you commit.😌`);
            process.exit(1);
        } else {
            console.log('\x1b[32m', 'ESLint pass');
            process.exit(0);
        }
    }
});
