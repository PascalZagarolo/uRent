'use client'

export function setLocalStorage(key: string, value: string) {
    if (typeof window !== "undefined") {
        console.log("Server")
    } else {
        console.log("Client")
    }
}