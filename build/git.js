/**
 * Created by jeesoong on 16/9/9.
 */

require('shelljs/global')

const path = require('path')
const fs = require('fs')
const clamUtil = require('clam-util')
const colors = require('colors')

let currentBranch = 0


function newBranch () {
    exec('git branch -a & git tag', function (err, stdout, stderr) {
        var r = clamUtil.getBiggestVersion(stdout.match(/\d+\.\d+\.\d+/ig));
        if (!r) {
            r = '0.1.0';
        } else {
            r = updateVersion(r)
        }
        console.log(colors.green('新分支：daily/' + r))
        currentBranch = r
        exec(`git checkout -b daily/${currentBranch}`, {async:true})
        // 回写入 abc.json 的 version
        let abcFile = path.resolve(process.cwd(), 'abc.json')
        let abcJSON = require(abcFile)
        abcJSON.version = r
        fs.writeFile(abcFile, JSON.stringify(abcJSON), (err) => {
            if (err) console.log(colors.red(err))
            console.log(colors.green("update abc.json."))
            exec('git add .', {async:true})
            exec('git commit -m "test"', {async:true})
            exec(`git push origin daily/${currentBranch}`, {async:true})
        })

    })
}

function updateVersion (versionArr) {
    if (versionArr[2] < 9) {
        versionArr[2]++
    } else {
        versionArr[2] = 0
        if (versionArr[1] < 9) {
            versionArr[1]++
        } else {
            versionArr[1] = 0
            versionArr[0]++
        }
    }
    return versionArr.join('.')
}

newBranch()