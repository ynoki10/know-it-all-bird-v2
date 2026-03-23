import { atom } from 'jotai';

export type Page = 'top' | 'input' | 'thinking' | 'result';

export const pageAtom = atom<Page>('top');
export const wordAtom = atom<string>('');
export const resultAtom = atom<string>('');
export const isLoadingAtom = atom<boolean>(false);
