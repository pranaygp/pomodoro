const _ = require('lodash')
const ps =require('current-processes')
const exec = require('child_process').exec;

const BLACKLIST = ['Google Chrome', 'Google Chrome Canary', 'Rambox', 'Slack']
const WORK_TIME_MINS = 25

let killed_processes = 0;
let listenAndKill = start => ps.get((err, processes) => {
    let toKill = _.filter(processes, p => BLACKLIST.includes(p.name))
    killed_processes += toKill.map(c => process.kill(c.pid)).filter(Boolean).length
    process.stdout.write("\t" + Math.floor(((1000 * 60 * WORK_TIME_MINS) - (Date.now() - start))/(1000 * 60)) + " mins to go.\tKilled " + killed_processes + " processes\r");
    if(Date.now() - start < 1000 * 60 * WORK_TIME_MINS)
      listenAndKill(start);
})

listenAndKill(Date.now())
