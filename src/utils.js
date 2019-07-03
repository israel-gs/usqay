const fs = require('fs')
const { join } = require('path')

const packageInfo = JSON.parse(fs.readFileSync(join(__dirname, '..', 'package.json'), { encoding: 'utf-8' }))

const setToken = (token) => {
    console.log(token)
}

const setDefaultProjectsPath = (pathname) => {
    console.log(pathname)
}

const setGitUserName = (username) => {
    console.log(username)
}

module.exports = {
    packageInfo,
    setToken,
    setDefaultProjectsPath,
    setGitUserName,
}