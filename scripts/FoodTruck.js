// FoodTruck module that generates the HTML
import { EntreeChoice } from "./Entrees.js";
import { Sales } from "./Sales.js";
import { SideChoice } from "./SideDishes.js";
import { VeggieChoice } from "./Vegetables.js";
import { TransientChoice, setEntreeId, setVeggieId, setSideId } from "./TransientState.js";

export const FoodTruck = async () => {
    // Fetch HTML content from different modules
    const salesHTML = await Sales();
    const entreeHTML = await EntreeChoice();
    const veggieHTML = await VeggieChoice();
    const sideHTML = await SideChoice();

    // Generate and return the HTML string
    return `
        <header class="header">
            <img src="./images/hummus.png" class="logo" />
            <h1 class="title">Laura Kathryn's House of Hummus</h1>
        </header>
        
        <article class="entree">
            <h4>Base Dish</h4>
            ${entreeHTML}
        </article>
        
        <article class="entree">
            <h4>Vegetables</h4>
            ${veggieHTML}
        </article>
        
        <article class="entree">
            <h4>Sides</h4>
            ${sideHTML}
        </article>

        <article>
            <button id="purchase">Purchase Combo</button>
        </article>

        <article class="customerOrders">
            <h2>Monthly Sales</h2>
            ${salesHTML}
        </article>
    `;
};

// Function to handle the purchase button click event
const initializePurchaseHandler = async () => {
    // Fetches data from all their urls and produces json format
    const entrees = await (await fetch("http://localhost:8088/entrees")).json();
    const veggies = await (await fetch("http://localhost:8088/vegetables")).json();
    const sides = await (await fetch("http://localhost:8088/sides")).json();

    document.addEventListener("click", async (event) => { // checks for purchase id and proceeds with code
        if (event.target.id === "purchase") {
            // Make sure all below choices are selected in order for it to continue
            if (TransientChoice.entreeId && TransientChoice.veggieId && TransientChoice.sideId) {
                // Fetch the selected items and convert the grabbed id to string so they can match with JS
                const selectedEntree = entrees.find(entree => entree.id === TransientChoice.entreeId.toString());
                const selectedVeggie = veggies.find(veggie => veggie.id === TransientChoice.veggieId.toString());
                const selectedSide = sides.find(side => side.id === TransientChoice.sideId.toString());

                // Calculate total price of all selected items
                const totalPrice = selectedEntree.price + selectedVeggie.price + selectedSide.price;

                // Create a purchase object 
                const newPurchase = {
                    totalPrice: totalPrice.toFixed(2)
                };

                // Send the new purchase to the API
                await fetch("http://localhost:8088/purchases", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newPurchase)
                });

                // Fetch all purchases again to get the latest one
                const purchases = await fetch("http://localhost:8088/purchases").then(res => res.json());

                // Increment the receipt number by the current purchases length
                const receiptNumber = purchases.length;

                // Update the sales section with the new receipt
                const receiptHTML = `
                    <div class="receipt">
                        Receipt #${receiptNumber} = $${totalPrice.toFixed(2)}
                    </div>
                `;

                // Append the new receipt to the customer orders section without re-rendering the whole page
                document.querySelector(".customerOrders").innerHTML += receiptHTML;
            } else {
                alert("Please select an entree, vegetable, and side.");
            }
        }
    });
};

// To render the FoodTruck and set up the event handler
const renderFoodTruck = async () => {
    document.querySelector('#container').innerHTML = await FoodTruck();
    initializePurchaseHandler(); // Initialize the purchase handler
}

// Call the render function to set up the page
renderFoodTruck();

