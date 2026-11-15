

let ingredients = [
    { name: "Basmati Rice (kg)", qty: 1, cost: 120 },
    { name: "Chicken (kg)", qty: 1, cost: 220 },
    { name: "Onion (kg)", qty: 0.5, cost: 60 },
    { name: "Tomato (kg)", qty: 0.25, cost: 60 },
    { name: "Cooking Oil (litre)", qty: 0.1, cost: 150 },
    { name: "Curd (kg)", qty: 0.2, cost: 100 },
    { name: "Biriyani Spices", qty: 1, cost: 40 },
    { name: "Ginger Garlic Paste (kg)", qty: 0.1, cost: 150 },
    { name: "Mint & Coriander", qty: 1, cost: 20 }
];



function displayIngredients() {

    let table = document.getElementById("ingredientTable");

    table.innerHTML = "";

    ingredients.forEach((item, index) => {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        let nameInput = document.createElement("input");

        nameInput.type = "text";
        nameInput.value = item.name;

        nameInput.addEventListener("input", function() {
            ingredients[index].name = this.value;
        });

        nameCell.appendChild(nameInput);


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



function addIngredient() {

    ingredients.push({
        name: "New Ingredient",
        qty: 1,
        cost: 0
    });

    displayIngredients();

}



function deleteIngredient(index) {

    ingredients.splice(index, 1);

    displayIngredients();

}



function calculateCost() {

    let total = 0;

    ingredients.forEach(function(item) {

        total += item.qty * item.cost;

    });

    let servings = Number(
        document.getElementById("servings").value
    );

    let perServing = servings > 0
        ? total / servings
        : 0;

    document.getElementById("totalCost").innerText =
        "₹" + total.toFixed(2);

    document.getElementById("perServing").innerText =
        "₹" + perServing.toFixed(2);

}



function saveRecipe() {

    let servings = Number(
        document.getElementById("servings").value
    );

    if (!Number.isFinite(servings) || servings <= 0) {
        alert("Please enter valid servings.");
        return;
    }

    let recipe = {
        recipeName: "Chicken Biriyani",
        ingredients: ingredients,
        servings: servings,
        totalCost: document.getElementById("totalCost").innerText,
        perServing: document.getElementById("perServing").innerText
    };

    localStorage.setItem(
        "chickenBiriyani",
        JSON.stringify(recipe)
    );

    alert("Chicken Biriyani Recipe Saved Successfully!");

}



displayIngredients();
