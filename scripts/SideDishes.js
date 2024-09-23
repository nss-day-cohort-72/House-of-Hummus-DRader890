import { setSideId } from "./TransientState.js"

const sideChange = (changeEvent) => {
    if (changeEvent.target.name === "side") {
        const convertToInteger = parseInt(changeEvent.target.value)
        setSideId(convertToInteger)
    }
}


export const SideChoice = async () => {
    const response = await fetch ("http://localhost:8088/sides")
    const sides = await response.json()

    document.addEventListener("change", sideChange)

    let choicesHTML = ""
    for (const side of sides) {
        choicesHTML += `<input type='radio' name='side' value='${side.id}' /> ${side.title}<br>`
    } 
    
    return choicesHTML
} 

