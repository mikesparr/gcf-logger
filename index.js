"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var Logger = (function () {
    function Logger(opts) {
        this.levelInfo = {
            all: 0,
            trace: 1,
            debug: 2,
            info: 3,
            warn: 4,
            error: 5,
            fatal: 6,
            none: 7,
        };
        this.levelNames = [
            "all",
            "trace",
            "debug",
            "info",
            "warn",
            "error",
            "fatal",
            "none",
        ];
        this.pid = process.pid;
        this.hostname = os.hostname();
        this.init(opts);
    }
    Logger.prototype.init = function (opts) {
        if (!this.name && !opts.name) {
            throw new Error("logger: You must provide a name");
        }
        if (opts.level && opts.level === 0) {
            opts.level = 0;
        }
        else {
            opts.level = opts.level || this.levelInfo.info;
        }
        if (opts.requestId) {
            this.requestId = opts.requestId;
        }
        if (opts.name) {
            this.name = "" + opts.name;
        }
        this.level = opts.level;
    };
    Logger.prototype.trace = function (message) {
        this.log(this.levelInfo.trace, message);
    };
    Logger.prototype.debug = function (message) {
        this.log(this.levelInfo.debug, message);
    };
    Logger.prototype.info = function (message) {
        this.log(this.levelInfo.info, message);
    };
    Logger.prototype.warn = function (message) {
        this.log(this.levelInfo.warn, message);
    };
    Logger.prototype.error = function (message) {
        this.log(this.levelInfo.error, message);
    };
    Logger.prototype.fatal = function (message) {
        this.log(this.levelInfo.fatal, message);
    };
    Logger.prototype.log = function (level, message) {
        if (level < this.level) {
            return;
        }
        var timestamp = (new Date()).toISOString();
        var info = {
            ts: timestamp,
            msg: message,
            type: this.levelNames[this.level],
            ref: (this.requestId) ? "" + this.requestId : null,
            name: this.name,
            level: this.level,
            host: this.hostname,
            pid: this.pid,
        };
        console.log(JSON.stringify(info));
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=index.js.map