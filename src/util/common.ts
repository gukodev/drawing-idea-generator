export function clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max)
}

export function choose<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

export function chooseN<T>(arr: T[], n: number): T[] {
    return Array.from({ length: n }, () => choose(arr))
}
