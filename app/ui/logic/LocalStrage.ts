import { Item } from "./StrToDef";
// export function saveData(key: string, data:Item[]) {
//     console.log(data);
//     if (typeof window !== "undefined") {
//        localStorage.setItem(key, JSON.stringify(data));
//     }
// }

export function getData(key:string) {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    return null;
}

export async function saveData(key: string, data: Item[]) {
    if (typeof window !== "undefined") {
        await localStorage.setItem(key, JSON.stringify(data));
    }
}
