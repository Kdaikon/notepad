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

        const termStrings = sentenceStr.split(/[' 　']/);

        const terms: term[] = termStrings.map((termStr, termN) => {
            const decos: deco[] = [];
            let text = '';
            //後で文字数判定追加 形骸化
            let x = 10;
            //  + termscount * 20;
            let y = 10 + textOffset * 20;
            //仮設定
            let group = 0;
            let id = uuidv4();
            let fontsize = 20;

            // Find all decorations and the remaining text
            let i = 0;
            while (i < termStr.length) {
                if (termStr[i] === '^' || termStr[i] === '＾') {
                    i++;
                    if (deco_words.includes(termStr[i])) {
                        //全角は半角に変換する
                        const temStrHan = termStr[i].replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
                            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
                        });
                        decos.push({ deco: temStrHan });
                        switch (temStrHan) {
                            case 't':
                                isOffset = true;
                                break;
                            case 'p':
                                isOffset = true;
                                break;
                            default:
                                break;
                        }
                    }
                    if (termStr[i] === '^' || termStr[i] === '＾'){
                        text += termStr[i];
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
