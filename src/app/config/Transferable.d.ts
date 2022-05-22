export interface Transferable<T> {
    ToDTO(): T;
    FromDTO(from: T): Transferable<T>;
}