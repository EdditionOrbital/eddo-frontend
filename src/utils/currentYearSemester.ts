const currentDate = new Date()
export const currentSem = currentDate.getMonth() < 6 ? 2 : 1
export const currentYear = currentSem === 1 ? currentDate.getFullYear() : currentDate.getFullYear() - 1
export const isCurrentSemMod = (moduleId: string) => {
	const [code, year, sem] = moduleId.split('-')
	return parseInt(year) === currentYear && parseInt(sem) === currentSem
}