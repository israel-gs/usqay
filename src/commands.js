const program = require('commander')
const {
    packageInfo,
    setToken,
    setDefaultProjectsPath,
    setGitUserName,
    getToken,
    getDefaultProjectsPath,
    getGitUserName,
    createNewRepository,
    deleteRepository,
    gitIgnore,
    createFolder,
    createGitIgnore,
    existFolder } = require('./utils')
const { exec } = require('child_process')
const { join } = require('path')

program
    .version(packageInfo.version, '-v, --version')

program
    .option('-t, --config-token <token>', `Config oAuth token from github`, (token) => {
        setToken(token)
    })
    .option('-p, --config-path <path>', `Config default projects path`, (path) => {
        setDefaultProjectsPath(path)
    })
    .option('-u, --config-username <username>', `Config your git username`, (username) => {
        setGitUserName(username)
    })
    .option('-c, --create <projectName>', `Config your git username`, (projectName) => {

        const hasToken = getToken()
        const hasDefaultProjectPath = getDefaultProjectsPath()
        const hasGitUserName = getGitUserName()

        if (!hasToken || !hasDefaultProjectPath || !hasGitUserName) {
            console.log('You have not yet configured the token, project path or git username, please use --help command to get help')
        } else {
            createNewRepository(projectName, hasToken)
                .then(res => {
                    const remoteUrl = res.data.clone_url
                    const projectPath = join(hasDefaultProjectPath, projectName)

                    if (!existFolder(projectPath)) {
                        createFolder(projectPath)
                        exec(`git init ${projectPath} && 
                          cd ${projectPath} && git remote add origin ${remoteUrl}`, (error, stdout, stderr) => {
                                if (error) {
                                    deleteRepository(projectName, hasGitUserName, hasToken)
                                        .then((res) => {
                                            console.log('The repository was deleted because an error occurred.')
                                        })
                                        .catch((err) => { console.error(err) })
                                    console.error(error)
                                }
                                createGitIgnore(join(projectPath, '.gitignore'), gitIgnore)
                                exec(`cd ${projectPath} &&
                                  git add . &&
                                  git commit -m "Initial Commit" &&
                                  git push origin master`, (error, stdout, stderr) => {
                                        if (error) {
                                            deleteRepository(projectName, hasGitUserName, hasToken)
                                                .then((res) => {
                                                    console.log('The repository was deleted because an error occurred.')
                                                })
                                                .catch((err) => { console.error(err) })
                                            console.error(error)
                                        }
                                        console.log('Finnished')
                                    })
                            })

                    } else {
                        console.log('A directory with that name already exists')
                        deleteRepository(projectName, hasGitUserName, hasToken)
                            .then((res) => {
                                console.log('The repository was deleted because an error occurred.')
                            })
                            .catch((err) => { console.error(err) })
                    }

                })
                .catch((err) => {
                    console.error(err)
                    deleteRepository(projectName, hasGitUserName, hasToken)
                        .then((res) => {
                            console.log('The repository was deleted because an error occurred.')
                        })
                        .catch((err) => { console.error(err) })
                })
        }

    })

program.parse(process.argv)