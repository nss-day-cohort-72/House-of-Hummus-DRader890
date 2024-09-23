
// Transient state object to store customer choices
export let TransientChoice = {
    entreeId: 0,        // Integer default value
    veggieId: 0,         // Integer default value
    sideId: 0,        // Integer default value
}

// Setter functions to update transient state

export const setEntreeId = (id) => {
    TransientChoice.entreeId = id;
}

export const setVeggieId = (id) => {
    TransientChoice.veggieId = id;
}

export const setSideId = (id) => {
    TransientChoice.sideId = id;
}

