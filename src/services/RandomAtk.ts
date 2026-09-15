export default function randomAtk(min:number, max:number) {
    const minNumber = Math.ceil(min)
    const maxNumber = Math.floor(max)
    return Math.floor(
        Math.random() * (maxNumber - minNumber) + minNumber,
    )
}