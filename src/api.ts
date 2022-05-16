export const api = {
    regalos: {
        list: async () => {
            return new Promise( (res, rej) => {
                const data =  JSON.parse(window.localStorage.getItem('regalos') || '[]')
                setTimeout(() => res(data), 1500)
            })
            
        }
    } 
}