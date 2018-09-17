/**
 * Inspired by https://github.com/chilts/12factor-log
 */
import * as os from "os";

export interface ILogger {
    init(opts: {[key: string]: any}): void;
    trace(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
}

export class Logger implements ILogger {
    /* tslint:disable:object-literal-sort-keys */
    protected hostname: string;
    protected level: number;
    protected name: string;
    protected pid: number;
    protected requestId: string;

    protected levelInfo: {[key: string]: number} = {
        all         : 0,
        trace       : 1,
        debug       : 2,
        info        : 3,
        warn        : 4,
        error       : 5,
        fatal       : 6,
        none        : 7,
    };
    protected levelNames: string[] = [
        "all",      // 0
        "trace",    // 1
        "debug",    // 2
        "info",     // 3
        "warn",     // 4
        "error",    // 5
        "fatal",    // 6
        "none",     // 7
    ];

    constructor(opts: {[key: string]: any}) {
        this.pid = process.pid;
        this.hostname = os.hostname();
        this.init(opts);
    }

    public init(opts: {[key: string]: any}): void {
        if (!this.name && !opts.name) {
            throw new Error("logger: You must provide a name");
        }
        if (opts.level && opts.level === 0) {
            opts.level = 0;
        } else {
            opts.level = opts.level || this.levelInfo.info;
        }
        if (opts.requestId) {
            this.requestId = opts.requestId;
        }
        if (opts.name) {
            this.name = `${opts.name}`;
        }
        this.level = opts.level;
    }

    public trace(message: string): void {
        this.log( this.levelInfo.trace, message );
    }
    public debug(message: string): void {
        this.log( this.levelInfo.debug, message );
    }
    public info(message: string): void {
        this.log( this.levelInfo.info, message );
    }
    public warn(message: string): void {
        this.log( this.levelInfo.warn, message );
    }
    public error(message: string): void {
        this.log( this.levelInfo.error, message );
    }
    public fatal(message: string): void {
        this.log( this.levelInfo.fatal, message );
    }

    private log(level: number, message: string): void {
        // don't log unless level same or above
        if (level < this.level) {
            return;
        }

        const timestamp: string = (new Date()).toISOString();
        const info: {[key: string]: any} = {
            ts          : timestamp,
            msg         : message,
            type        : this.levelNames[this.level],
            ref         : (this.requestId) ? `${this.requestId}` : null,
            name        : this.name,
            level       : this.level,
            host        : this.hostname,
            pid         : this.pid,
        };

        /* tslint:disable:no-console */
        console.log( JSON.stringify(info) );
    }
}
