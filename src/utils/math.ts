export const math = (a: number, b: number, ...arr: number[]) => {
    return a * b * arr.reduce((acc, currentNum) => {
        return acc * currentNum
    }, 1)
}