/**
 * Created by jeesoong on 16/9/9.
 */

require('shelljs/global')

const path = require('path')
const fs = require('fs')
const clamUtil = require('clam-util')
const colors = require('colors')

let currentBranch = 0




class gitWorkFlow {
    constructor () {
        this.init()
    }

    init () {
        let command = process.argv[2]

        switch (command) {
            case 'newBranch':
                this.newBranch()
                break
            default:
                console.log(11)
        }
    }

    // 创建新的分支
    newBranch () {
        let me = this
        exec('git branch -a & git tag', function (err, stdout, stderr) {
            var r = clamUtil.getBiggestVersion(stdout.match(/\d+\.\d+\.\d+/ig));
            if (!r) {
                r = '0.1.0';
            } else {
                r = me.updateVersion(r)
            }
            console.log(colors.green('新分支：daily/' + r))
            currentBranch = r
            exec(`git checkout -b daily/${currentBranch}`, {async:true})
            // 回写入 abc.json 的 version
            let abcFile = path.join(__dirname, 'abc.json')
            let abcJSON = require(abcFile)
            abcJSON.version = r
            try {
                fs.writeFile(abcFile, JSON.stringify(abcJSON), (err) => {
                    if (err) console.log(colors.red(err))
                    console.log(colors.green("update abc.json."))
                    me.add()
                    me.commit()
                    me.push(currentBranch)
                })
            } catch (e) {
                console.log(colors.red('未找到abc.json'))
            }


        })
    }

    add() {
        exec('git add .', {async: true})
    }

    commit() {
        exec('git commit -m "test"', {async: true})
    }

    push(currentBranch) {
        exec(`git push origin daily/${currentBranch}`, {async: true})
    }

    updateVersion(versionArr) {
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
}

new gitWorkFlow()