declare module "websocket" {
  export class w3cwebsocket {
    static readonly CONNECTING: number;
    static readonly OPEN: number;
    static readonly CLOSING: number;
    static readonly CLOSED: number;

    constructor(url: string, protocols?: string | string[]);

    onopen: () => void;
    onclose: () => void;
    onmessage: (message: { data: string }) => void;
    send(data: string): void;
    close(code?: number, reason?: string): void;

    readyState: number;
  }
}
