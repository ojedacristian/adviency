export const api = {
    regalos: {
        list: async () => {
            return await JSON.parse(window.localStorage.getItem('regalos') || '[]')
        }
    } 
}