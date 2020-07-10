export function setLocal(key, value) {
    localStorage.setItem(key , JSON.stringify(value))
}

export function getLocal(key) {
    let msg = localStorage.getItem(key)    
    return JSON.parse(msg);
}

export function removeLocal(key) {
    localStorage.removeItem(key);
}

