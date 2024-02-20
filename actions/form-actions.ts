export function onKeyPressForm(event: any, action: () => void, cancel: () => void) {
    if(event.key === "Enter") {
        return action();
    } else if(event.key === "Escape") {
        return cancel();
    }
}