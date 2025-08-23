type EventKey = string;
type EventPattern = RegExp;
type EventName = EventKey | EventPattern | typeof ALL_EVENTS;
type Subscriber<T = unknown> = (data: T) => void;

export type EmitterEvent<T = unknown> = {
    eventName: EventKey;
    data: T;
};

const ALL_EVENTS = '*';

export interface IEvents {
    on<T extends object>(event: EventName, callback: Subscriber<T>): void;
    off<T extends object>(event: EventName, callback: Subscriber<T>): void;
    emit<T extends object>(event: EventKey, data?: T): void;
    trigger<T extends object>(event: EventKey, context?: Partial<T>): Subscriber<T>;
    onAll(callback: Subscriber<EmitterEvent>): void;
    offAll(): void;
}

export class EventEmitter implements IEvents {
    private _events: Map<EventName, Set<Subscriber>>;

    constructor() {
        this._events = new Map<EventName, Set<Subscriber>>();
    }


    on<T extends object>(eventName: EventName, callback: Subscriber<T>): void {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber>());
        }
        this._events.get(eventName)!.add(callback as Subscriber);
    }

    off<T extends object>(eventName: EventName, callback: Subscriber<T>): void {
        const subscribers = this._events.get(eventName);
        if (!subscribers) return;

        subscribers.delete(callback as Subscriber);

        if (subscribers.size === 0) {
            this._events.delete(eventName);
        }
    }

    emit<T extends object>(eventName: EventKey, data?: T): void {
        this._events.forEach((subscribers, name) => {
            if (name === ALL_EVENTS) {
                subscribers.forEach(callback =>
                    callback({ eventName, data })
                );
            }

            if (name instanceof RegExp && name.test(eventName)) {
                subscribers.forEach(callback => callback(data));
            }

            if (name === eventName) {
                subscribers.forEach(callback => callback(data));
            }
        });
    }

    onAll(callback: Subscriber<EmitterEvent>): void {
        this.on(ALL_EVENTS, callback);
    }

    offAll(): void {
        this._events.clear();
    }

    trigger<T extends object>(eventName: EventKey, context?: Partial<T>): Subscriber<T> {
        return (event: T) => {
            this.emit(eventName, {
                ...(event || {}),
                ...(context || {}),
            } as T);
        };
    }
}


