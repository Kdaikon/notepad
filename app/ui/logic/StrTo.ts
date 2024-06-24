import { sentence, term, Item, deco, deco_words } from "./StrToDef";
import { v4 as uuidv4} from 'uuid';

export function parseInputToItem(input: string): Item {
    // Split input into sentences by newline character
    const sentenceStrings = input.split('\n');
    var termscount = 0;
    const id = uuidv4();

    const sentences: sentence[] = sentenceStrings.map((sentenceStr, sentN) => {
        // Split sentence into terms by space character
        const termStrings = sentenceStr.split(' ');

        const terms: term[] = termStrings.map((termStr, termN) => {
            const decos: deco[] = [];
            let text = '';
            //後で文字数判定追加 形骸化
            let x = 0;
            //  + termscount * 20;
            let y = sentN * 20;
            //仮設定
            let group = 0;

            // Find all decorations and the remaining text
            let i = 0;
            while (i < termStr.length) {
                if (termStr[i] === '^') {
                    i++;
                    if (deco_words.includes(termStr[i])) {
                        decos.push({ deco: termStr[i] });
                    }
                } else {
                    text += termStr[i];
                }
                i++;
            }

            termscount += text.length;
            return {
                text,
                decos,
                x,
                y,
                group
            };
        });
        termscount = 0;

        return {
            terms
        };
    });

    return {
        sentences,
        id
    };
}
