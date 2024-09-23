import { setEntreeId } from "./TransientState.js"

const entreeChange = (changeEvent) => {
    if (changeEvent.target.name === "entree") {
        const convertToInteger = parseInt(changeEvent.target.value)
        setEntreeId(convertToInteger)
    }
}

export const EntreeChoice = async () => {
    const response = await fetch ("http://localhost:8088/entrees")
    const entrees = await response.json()

    document.addEventListener("change", entreeChange)

    let choicesHTML = ""
    for (const entree of entrees) {
        choicesHTML += `<input type='radio' name='entree' value='${entree.id}' /> ${entree.name}<br>`
    } 
    
    return choicesHTML
} 


/* This function listens for a change event on the document, specifically looking for changes to the input elements where the name attribute is "entree".

When an entree is selected (radio button change event), it captures the selected value (which is the entree's ID) and converts it to an integer using parseInt().

The setEntreeId() function is then called to update the transient state with the selected entree's ID.*/