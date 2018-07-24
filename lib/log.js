const colors = {
  reset: "\x1b[39m",
  red: "\x1b[91m",
  blue: "\x1b[94m",
  cyan: "\x1b[96m",
  magenta: "\x1b[95m",
  gray: "\x1b[90m",
  yellow: "\x1b[93m",
  green: "\x1b[92m",
  white: "\x1b[97m",
};

const consoleLog = (color, message) => console.log([colors[color], message,colors.reset].join(""));
const log = {};

Object.keys(colors).forEach(c =>{
  if(c === "reset")
    return;

  log[c] = m => consoleLog(c, m);
});

export default log;