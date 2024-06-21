export type deco = {
    deco: 'r' | 't' | 'z' | string;
};

export type term = {
    text: string;
    decos: deco[];
};

export type sentence = {
    terms: term[];
};

export type Item = {
    sentences: sentence[];
};

const input: string = '^tTITLE\nDESCRI ^rPT ION IS^r'
const deco_words: string[] = [
    'r',
    't',
    'z',
    'ｒ',
    'ｔ',
    'ｚ',
]

const itemInstance: Item = {
    sentences: [
        {
            terms: [
                {
                    text: "Hello",
                    decos: [{ deco: 'r' }]
                },
                {
                    text: "world",
                    decos: [{ deco: 't' }, { deco: 'z' }]
                }
            ]
        },
        {
            terms: [
                {
                    text: "This",
                    decos: [{ deco: 'z' }]
                },
                {
                    text: "is",
                    decos: [{ deco: 'r' }]
                },
                {
                    text: "TypeScript",
                    decos: [{ deco: 't' }]
                }
            ]
        }
    ]
};

console.log(itemInstance);

function parseInputToItem(input: string): Item {
    // Split input into sentences by newline character
    const sentenceStrings = input.split('\n');

    const sentences: sentence[] = sentenceStrings.map(sentenceStr => {
        // Split sentence into terms by space character
        const termStrings = sentenceStr.split(' ');

        const terms: term[] = termStrings.map(termStr => {
            const decos: deco[] = [];
            let text = '';

            // Find all decorations and the remaining text
            let i = 0;
            while (i < termStr.length) {
                if (termStr[i] === '^') {
                    i++;
                    if (termStr[i] === 'r' || termStr[i] === 't' || termStr[i] === 'z') {
                        decos.push({ deco: termStr[i] });
                    }
                } else {
                    text += termStr[i];
                }
                i++;
            }

            return {
                text,
                decos
            };
        });

        return {
            terms
        };
    });

    return {
        sentences
    };
}
