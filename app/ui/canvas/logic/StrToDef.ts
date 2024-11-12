export type deco = {
    deco: 'r' | 't' | 'z' | 'p' | 'b' | 'u' |string;
};

export type term = {
    text: string;
    decos: deco[];
    x: number;
    y: number;
    group: number;
    id: string;
    fontsize: number;
};

export type sentence = {
    terms: term[];
};

export type Item = {
    sentences: sentence[];
    id: string;
    x: number;
    y: number;
    originalText: string;
};

const input: string = '^tTITLE\nDESCRI ^rPT ION IS^r'
export const deco_words: string[] = [
    'r',
    't',
    'z',
    'p',
    'b',
    'u',
    'd',
    'ｒ',
    'ｔ',
    'ｚ',
    'ｐ',
    'ｂ',
    'ｕ',
    'ｄ',
]