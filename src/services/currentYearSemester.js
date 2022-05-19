const currentDate = new Date()
export const currentSem = currentDate.getMonth() < 6 ? 2 : 1
export const currentYear = currentSem === 1 ? currentDate.getFullYear() : currentDate.getFullYear() - 1