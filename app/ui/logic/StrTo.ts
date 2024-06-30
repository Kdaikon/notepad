import { sentence, term, Item, deco, deco_words } from "./StrToDef";
import { v4 as uuidv4 } from 'uuid';

export function parseInputToItem(input: string, dx:number ,dy:number ): Item {
    // Split input into sentences by newline character
    let originalText = input;
    const sentenceStrings = input.split('\n');
    var termscount = 0;
    //フォントサイズによる高さの幅
    let textOffset = 0;
    const id = uuidv4();

    const sentences: sentence[] = sentenceStrings.map((sentenceStr, sentN) => {
        // Split sentence into terms by space character
        let isOffset = false;

        const termStrings = sentenceStr.split(' ');

        const terms: term[] = termStrings.map((termStr, termN) => {
            const decos: deco[] = [];
            let text = '';
            //後で文字数判定追加 形骸化
            let x = 0;
            //  + termscount * 20;
            let y = textOffset * 20;
            //仮設定
            let group = 0;
            let id = uuidv4();
            let fontsize = 20;

            // Find all decorations and the remaining text
            let i = 0;
            while (i < termStr.length) {
                if (termStr[i] === '^') {
                    i++;
                    if (deco_words.includes(termStr[i])) {
                        decos.push({ deco: termStr[i] });
                        switch (termStr[i]) {
                            case 't':
                                fontsize = 30;
                                isOffset = true;
                                break;
                            case 'ｔ':
                                fontsize = 30;
                                isOffset = true;
                                break;
                            case 'r':
                                break;
                            default:
                                break;
                        }
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
                group,
                id,
                fontsize
            };
        });
        termscount = 0;
        if (isOffset) {
            textOffset += 1.5;
        }else{
            textOffset += 1;
        }

        return {
            terms
        };
    });


    let x = dx;
    let y = dy;
    
    return {
        sentences,
        id,
        x,
        y,
        originalText
    };
}
