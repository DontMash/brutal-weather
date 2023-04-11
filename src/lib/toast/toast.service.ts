export type Toast = {
    message: string;
    duration: number;
};

class ToastService extends EventTarget {
    private queue: Array<Toast>;
    private timeout: number;

    constructor() {
        super();

        this.queue = new Array<Toast>();
        this.timeout = -1;
    }

    add(message: string, duration: number = 1000) {
        const toast: Toast = { message, duration };
        this.queue.unshift(toast);

        if (this.timeout < 1)
            this.pop();
    }

    private pop() {
        const toast = this.queue.pop();
        if (!toast) {
            clearTimeout(this.timeout);
            this.timeout = -1;
            return;
        }

        const event = new CustomEvent<Toast>('toast', {
            detail: toast,
        });
        this.dispatchEvent(event);

        this.timeout = setTimeout(() => this.pop(), toast.duration);
    }
}

const toastService = new ToastService();
export default toastService;
