module.exports = class Logger {
  constructor(fileName, debug = false) {
    this.fileName = fileName;
    this.debugMode = debug;
  }

  // Helper function
  getLineTrace(stack, fileName = this.fileName) {
    for (let i = 0; i < stack.length; i++) {
      if (stack[i].includes(fileName)) return stack[i];
    }
    return false;
  }

  // Helper function
  getLineNumber(trace) {
    const traces = trace.split("\\");
    const lineNumber = traces[traces.length - 1].split(":");
    lineNumber.pop();
    return lineNumber.join(":");
  }

  // Helper function
  getTrace(tag, message) {
    let stack = new Error().stack || "";
    stack = stack.split("\n").map((line) => line.trim());

    const data = [];

    const trace = this.getLineTrace(stack);
    if (trace) {
      data.push(this.getLineNumber(trace));
    }

    data.push(tag);
    data.push(message);
    console.log(data.join("  | "));
  }

  info(message) {
    this.getTrace("INFO ", message);
  }

  debug(message) {
    if (this.debugMode) this.getTrace("DEBUG", message);
  }

  warn(message) {
    this.getTrace("WARN ", message);
  }

  error(message) {
    this.getTrace("ERROR", message);
  }
};
