export class Log {
    public static log(msg: string): void {
        console.log(msg);
    }

    public static info(msg: string): void {
        console.log('%c' + msg, 'color:#44A044');
    }

    public static warn(msg: string): void {
        console.warn('%c' + msg, 'color:#ff843d');
    }

    public static error(msg: string): void {
        console.error('%c' + msg, 'color:#DD0000');
    }
}
