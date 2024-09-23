 export const Sales = async () => {
    // Fetch the sales data from the API
    const sales = await fetch("http://localhost:8088/purchases").then(res => res.json());

    // Map through the sales data to create HTML for each receipt
    let salesDivs = sales.map((sale, index) => { // Use index to generate receipt number
        return `
            <div class="receipt">
                Receipt #${index + 1} = $${sale.totalPrice}
            </div>
        `;
    });

    // Join all the HTML strings into one
    salesDivs = salesDivs.join("");

    return salesDivs;
};


// even tho we basically  printed it in the FoodTruck module we still get it and post the html to FoodTruck here





