export function convertState(state: string): string {

    const fullState = state.trim();

    switch (fullState) {
        case "North Rhine-Westphalia":
            return "Nordrhein-Westfalen";
            break;
        case "Bavaria":
            return "Bayern";
            break;
        case "Lower Saxony":
            return "Niedersachsen";
            break;
        case "Baden-Württemberg":
            return "Baden-Württemberg";
            break;
        case "Rhineland-Palatinate":
            return "Rheinland-Pfalz";
            break;
        case "Saxony":
            return "Sachsen";
            break;
        case "Thuringia":
            return "Thüringen";
            break;
        case "Hessen":
            return "Hessen";
            break;
        case "Saxony-Anhalt":
            return "Sachsen-Anhalt";
            break;
        case "Brandenburg":
            return "Brandenburg";
            break;
        case "Mecklenburg-Vorpommern":
            return "Mecklenburg-Vorpommern";
            break;
        case "Hamburg":
            return "Hamburg";
            break;
        case "Schleswig-Holstein":
            return "Schleswig-Holstein";
            break;
        case "Saarland":
            return "Saarland";
            break;
        case "Bremen":
            return "Bremen";
            break;
        default:
            return state;
    }
}