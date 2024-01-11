export function todayString(){
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const today = `${month}/${day}/${year}`
    return today
}