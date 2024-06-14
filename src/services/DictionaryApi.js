
export const Dictionary = async(word) => {

    try {
        const dict = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        if (dict.ok) {
            const data = await dict.json()
            console.log(data)
            return data
        }
    }
    catch(error) {
        console.log(error)
    }
}