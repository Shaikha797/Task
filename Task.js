let ingredients = [];


// Display Ingredients
function displayIngredients() {

    let table = document.getElementById("ingredientTable");

    table.innerHTML = "";

    ingredients.forEach((item, index) => {

        let row = document.createElement("tr");

        // Ingredient Name
        let nameCell = document.createElement("td");
        let nameInput = document.createElement("input");

        nameInput.type = "text";
        nameInput.value = item.name;

        nameInput.addEventListener("input", function() {
            ingredients[index].name = this.value;
        });

        nameCell.appendChild(nameInput);


        // Quantity
        let qtyCell = document.createElement("td");
        let qtyInput = document.createElement("input");

        qtyInput.type = "number";
        qtyInput.min = "0";
        qtyInput.step = "any";
        qtyInput.value = item.qty;

        qtyInput.addEventListener("input", function() {

            ingredients[index].qty = Math.max(0, Number(this.value) || 0);

            calculateCost();

        });

        qtyCell.appendChild(qtyInput);


        // Ingredient Cost
        let costCell = document.createElement("td");
        let costInput = document.createElement("input");

        costInput.type = "number";
        costInput.min = "0";
        costInput.step = "any";
        costInput.value = item.cost;

        costInput.addEventListener("input", function() {

            ingredients[index].cost = Math.max(0, Number(this.value) || 0);

            calculateCost();

        });

        costCell.appendChild(costInput);


        // Delete Button
        let actionCell = document.createElement("td");
        let deleteButton = document.createElement("button");

        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        deleteButton.onclick = function() {
            deleteIngredient(index);
        };

        actionCell.appendChild(deleteButton);


        row.appendChild(nameCell);
        row.appendChild(qtyCell);
        row.appendChild(costCell);
        row.appendChild(actionCell);

        table.appendChild(row);

    });

    calculateCost();

}


// Add Ingredient
function addIngredient() {

    ingredients.push({

        name: "New Ingredient",
        qty: 1,
        cost: 0

    });

    displayIngredients();

}


// Delete Ingredient
function deleteIngredient(index) {

    ingredients.splice(index, 1);

    displayIngredients();

}


// Calculate Total Recipe Cost and Cost Per Serving
function calculateCost() {

    let ingredientCost = 0;

    ingredients.forEach(function(item) {

        ingredientCost += item.qty * item.cost;

    });


    let servings = Number(
        document.getElementById("servings").value
    );


    let totalCost = ingredientCost * servings;

    let perServing = servings > 0
        ? totalCost / servings
        : 0;


    // Display Total Recipe Cost
    document.getElementById("totalCost").innerText =
        "$" + totalCost.toFixed(2);


    // Display Cost Per Serving
    document.getElementById("perServing").innerText =
        "$" + perServing.toFixed(2);

}


// Save Recipe
function saveRecipe() {

    let servings = Number(
        document.getElementById("servings").value
    );

    if (!Number.isFinite(servings) || servings <= 0) {

        alert("Please enter valid servings.");

        return;

    }


    let ingredientCost = 0;

    ingredients.forEach(function(item) {

        ingredientCost += item.qty * item.cost;

    });


    let totalCost = ingredientCost * servings;

    let perServing = totalCost / servings;


    let recipe = {

        recipeName: "Chicken Biriyani",

        ingredients: ingredients,

        servings: servings,

        totalCost: "$" + totalCost.toFixed(2),

        perServing: "$" + perServing.toFixed(2)

    };


    localStorage.setItem(
        "chickenBiriyani",
        JSON.stringify(recipe)
    );


    alert("Chicken Biriyani Recipe Saved Successfully!");

}


// Initial Display
displayIngredients();
