const program = require('commander')
const { packageInfo, setToken, setDefaultProjectsPath, setGitUserName, } = require('./utils')

program
    .version(packageInfo.version, '-v, --version')

program
    .option('-t, --config-token <token>', `Config oAuth token from github`, (token) => {
        console.log(token)
        setToken(token)
    })
    .option('-p, --config-path <path>', `Config default projects path`, (path) => {
        setDefaultProjectsPath(path)
    })
    .option('-u, --config-username <username>', `Config your git username`, (username) => {
        setGitUserName(username)
    })

program.parse(process.argv)