const fs = require('fs')
const { join } = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const packageInfo = JSON.parse(fs.readFileSync(join(__dirname, '..', 'package.json'), { encoding: 'utf-8' }))
const Octokit = require('@octokit/rest')
const adapter = new FileSync('src/db.json')
const db = low(adapter)

db.defaults({
    config: {
        token: '',
        defaultProjectPath: '',
        gitUserName: ''
    }
}).write()

const setToken = (token) => {
    db.set('config.token', token).write()
}

const getToken = () => db.get('config.token').value()

const setDefaultProjectsPath = (pathname) => {
    db.set('config.defaultProjectPath', pathname).write()
}

const getDefaultProjectsPath = () => db.get('config.defaultProjectPath').value()

const setGitUserName = (username) => {
    db.set('config.gitUserName', username).write()
}

const getGitUserName = () => db.get('config.gitUserName').value()

const existFolder = (pathname) => fs.existsSync(pathname)

const createFolder = (pathname) => fs.mkdirSync(pathname, { recursive: true })

const createNewRepository = (repoName, token, options) => {
    const octokit = Octokit({
        auth: token,
        userAgent: `${packageInfo.name} ${packageInfo.version}`,
    })

    return octokit.repos.createForAuthenticatedUser({
        name: repoName,
        ...options
    })
}

const deleteRepository = (repoName, owner, token) => {
    const octokit = Octokit({
        auth: token,
        userAgent: `${packageInfo.name} ${packageInfo.version}`,
    })

    return octokit.repos.delete({
        owner,
        repo: repoName
    })
}

const createGitIgnore = (pathname, data) => {
    return fs.writeFileSync(pathname, data, { encoding: 'utf-8' })
}

const gitIgnore = fs.readFileSync(join(__dirname, 'gitignore.txt'), { encoding: 'UTF-8' })

module.exports = {
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
    existFolder,
    createFolder,
    createGitIgnore
}