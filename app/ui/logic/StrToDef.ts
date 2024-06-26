export type deco = {
    deco: 'r' | 't' | 'z' | string;
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
};

const input: string = '^tTITLE\nDESCRI ^rPT ION IS^r'
export const deco_words: string[] = [
    'r',
    't',
    'z',
    'ｒ',
    'ｔ',
    'ｚ',
]