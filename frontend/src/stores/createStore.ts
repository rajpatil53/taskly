import create, { SetState, State, GetState } from 'zustand';
import { persist } from 'zustand/middleware';

export default function createStore<T extends State>(store: (set: SetState<T>, get: GetState<T>) => T, key: string) {
    return create<T>(
        persist(
            store,
            { name: key }
        )
    )
}