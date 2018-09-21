import {ILogger, Logger} from "../index";

describe("GCF Logger", () => {
    const testName: string = "name";
    const testMessage: string = "something happened";
    const testRef: string = "test-1234567";

    const log: ILogger = new Logger({name: testName});

    it("instantiates a logger class", () => {
        expect(log).toBeInstanceOf(Logger);
    });

    it("throws error if missing required name", () => {
        const testInstance = () => {
            return new Logger({});
        };

        expect( testInstance ).toThrow(Error);
    });

    describe("info level", () => {
        jest.spyOn(global.console, "log");

        beforeEach(() => {
            jest.resetAllMocks();
        });

        it("does not log trace messages", () => {
            log.trace(testMessage);
            expect( global.console.log ).not.toHaveBeenCalled();
        });

        it("does not log debug messages", () => {
            log.debug(testMessage);
            expect( global.console.log ).not.toHaveBeenCalled();
        });

        it("logs info messages", () => {
            log.info(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs warn messages", () => {
            log.warn(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs error messages", () => {
            log.error(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs fatal messages", () => {
            log.fatal(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });
    }); // info level

    describe("debug level", () => {
        jest.spyOn(global.console, "log");

        beforeAll(() => {
            log.init({level: 2});
        });

        beforeEach(() => {
            jest.resetAllMocks();
        });

        it("does not log trace messages", () => {
            log.trace(testMessage);
            expect( global.console.log ).not.toHaveBeenCalled();
        });

        it("logs debug messages", () => {
            log.debug(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs info messages", () => {
            log.info(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs warn messages", () => {
            log.warn(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs error messages", () => {
            log.error(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs fatal messages", () => {
            log.fatal(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });
    }); // trace level

    describe("trace level", () => {
        jest.spyOn(global.console, "log");

        beforeAll(() => {
            log.init({level: 1});
        });

        beforeEach(() => {
            jest.resetAllMocks();
        });

        it("logs trace messages", () => {
            log.trace(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs debug messages", () => {
            log.debug(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs info messages", () => {
            log.info(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs warn messages", () => {
            log.warn(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs error messages", () => {
            log.error(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });

        it("logs fatal messages", () => {
            log.fatal(testMessage);
            expect( global.console.log ).toHaveBeenCalled();
        });
    }); // trace level

    describe("ref", () => {
        jest.spyOn(global.console, "log");

        beforeAll(() => {
            log.init({level: 1, ref: testRef});
        });

        beforeEach(() => {
            jest.resetAllMocks();
        });

        it("adds ref ID to logged object", (done) => {
            log.info(testMessage);
            const resultString = (global.console.log as any).mock.calls[0][0];
            const result = JSON.parse(resultString);

            expect(result.ref).toEqual(testRef);

            done();
        });
    }); // ref
});
