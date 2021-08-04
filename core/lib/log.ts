export class Log {
    static log(msg: string): void {
        console.log(msg);
    }

    static info(msg: string): void {
        console.log("%c" + msg, 'color:#44A044');
    }

    static warn(msg: string): void {
        console.warn("%c" + msg, 'color:#ff843d');
    }

    static error(msg: string): void {
        console.error("%c" + msg, 'color:#DD0000');
    }
}
