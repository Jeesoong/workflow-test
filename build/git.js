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
        this.initData()
        let command = process.argv[2]
        switch (command) {
            case 'newBranch':
                this.newBranch()
                break
            case 'tag':
                this.tag()
                break
            default:
                console.log(11)
        }
    }

    initData () {
        this.abcFile = path.join(__dirname, 'abc.json')
        this.abcJSON = require(this.abcFile)
        this.currentBranch = this.abcJSON.version || 'master'

    }

    // 创建新的分支
    newBranch () {
        let me = this
        exec('git branch -a & git tag', function (err, stdout, stderr) {
            let r = clamUtil.getBiggestVersion(stdout.match(/\d+\.\d+\.\d+/ig))
            if (!r) {
                r = '0.0.1'
            } else {
                r = me.updateVersion(r)
            }
            console.log(colors.green('新分支：daily/' + r))
            me.currentBranch = r
            exec(`git checkout -b daily/${me.currentBranch}`, {async:true})
            // 回写入 abc.json 的 version
            me.abcJSON.version = r
            try {
                fs.writeFile(me.abcFile, JSON.stringify(me.abcJSON), (err) => {
                    if (err) console.log(colors.red(err))
                    console.log(colors.green("update abc.json."))
                    me.add()
                    me.commit()
                    me.push(me.currentBranch)
                })
            } catch (e) {
                console.log(colors.red('未找到abc.json'))
            }


        })
    }
    tag () {
        this.add()
        this.commit()
        this.push(this.currentBranch)
        exec(`git tag publish/${this.currentBranch}`)
        this.publish()

    }
    publish () {
        exec(`git push origin publish/${this.currentBranch}`)
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