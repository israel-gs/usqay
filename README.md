# usqay.js

Powerfull tool for atomate project creation, inpired on [@KalleHallden](https://github.com/KalleHallden/ProjectInitializationAutomation) project idea.

> **usqay** means **fast** in the [Quechua](https://es.wikipedia.org/wiki/Lenguas_quechuas) language.

## Installation

```
npm install -g usqay
```

## Config

1. Config token

    First you need a github personal token, can create in this [link](https://github.com/settings/tokens/new) and check **repo, user and delete_repo**.

    ```
    $ usqay --config-token fefc852061ef10312345678d9864414e7469fb87
    // or
    $ usqay -c fefc852061ef10312345678d9864414e7469fb87
    ```
2. Config default project path
    ```
    $ usqay --config-path /path/to/my/projects/path
    // or
    $ usqay -p /path/to/my/projects/path
    ```
3. Config git username
    ```
    $ usqay --config-username israel-gs
    // or
    $ usqay -u israel-gs
    ```

## Creating a project

```
$ usqay --create project-name
// or
$ usqay -c project-name
```