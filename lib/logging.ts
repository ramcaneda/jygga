export enum LogLevel {
  verbose = -3,
  debug = -2,
  info = -1,
  error = 0
}

var _runningLogLevel = LogLevel.info;
if (process.env.LOGLEVEL && !isNaN(parseInt(process.env.LOGLEVEL))) {
  _runningLogLevel = parseInt(process.env.LOGLEVEL);
}
export function log(message: string, logLevel: LogLevel = LogLevel.debug) {
  if (logLevel >= _runningLogLevel) {
    console.log(message);
  }
}