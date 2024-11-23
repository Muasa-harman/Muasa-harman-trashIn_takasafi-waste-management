export const toTitleCase = (str:string)=>{
    return str
       .replace(/([A-Z])/g, ' $1')
       .replace(/^./,function (str) {
          return str.toUpperCase()
       })
}

export const generateSixDigitNumber = () => {
    return Math.floor(Math.random() * 900000) + 100000
}

export const MAX_AGE = 24 * 60 * 60