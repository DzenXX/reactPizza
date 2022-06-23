export const getTotalCountFromLS = () => {
    const data = localStorage.getItem('totalCount')
    return data ? JSON.parse(data) : 0
}