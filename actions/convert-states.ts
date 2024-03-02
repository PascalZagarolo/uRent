export function convertState(state : string) : string {
    switch(state) {
        case " North Rhine-Westphalia":
            return "Nordrhein-Westfalen";
            break;
        case "Bavaria":
            return "Bayern";
            break;
        default : 
            return state;
    }
}