import { setVeggieId } from "./TransientState.js"

const veggieChange = (changeEvent) => {
    if (changeEvent.target.name === "veggie") {
        const convertToInteger = parseInt(changeEvent.target.value)
        setVeggieId(convertToInteger)
    }
}


export const VeggieChoice = async () => {
    const response = await fetch ("http://localhost:8088/vegetables")
    const veggies = await response.json()

    document.addEventListener("change", veggieChange)

    let choicesHTML = ""
    for (const veggie of veggies) {
        choicesHTML += `<input type='radio' name='veggie' value='${veggie.id}' /> ${veggie.type}<br>`
    } 
    
    return choicesHTML
} 
