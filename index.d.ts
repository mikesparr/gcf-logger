export interface ILogger {
    init(opts: {
        [key: string]: any;
    }): void;
    trace(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
}
export declare class Logger implements ILogger {
    protected hostname: string;
    protected level: number;
    protected name: string;
    protected pid: number;
    protected ref: string;
    protected levelInfo: {
        [key: string]: number;
    };
    protected levelNames: string[];
    constructor(opts: {
        [key: string]: any;
    });
    init(opts: {
        [key: string]: any;
    }): void;
    trace(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
    private log;
}
