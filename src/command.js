const { exec } = require('child_process')

export class ExecCommandError extends Error {
  constructor (msg, exitCode, exitSignal) {
    super(msg)
    this.name = 'ExecCommandError'
    this.exitSignal = exitSignal
    this.exitCode = exitCode
  }
}

export const execCommand = (command, options = {}) => {
  const { onData, onError, ...execOptions } = options
  return new Promise((resolve, reject) => {
    let results = ''
    let errorStr = ''
    const childProcess = exec(command, {
      maxBuffer: 1024 * 1024,
      cwd: process.cwd(),
      ...execOptions
    })
    childProcess.on('exit', (code, signal) => {
      if (code === 0) {
        resolve(results)
      } else {
        reject(new ExecCommandError(errorStr, code, signal))
      }
    })
    childProcess.stdout.on('data', data => {
      if (onData) {
        onData(data, command)
      } else {
        results += data
      }
    })
    childProcess.stderr.on('data', data => {
      if (onError) {
        onError(data, command)
      }
      errorStr += data
    })
  })
}
