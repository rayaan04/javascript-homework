let dataStore = [];

const nameInput = document.getElementById('itemName');
const priceInput = document.getElementById('itemPrice');
const addBtn = document.getElementById('add-btn');
const listBody = document.getElementById('listBody');
const totalDisplay = document.getElementById('totalValue');
const statusMsg = document.getElementById('statusMsg');

addBtn.onclick = function() {
    const name = nameInput.value;
    const price = parseFloat(priceInput.value);

    if (name === "" || isNaN(price) || price <= 0) {
        statusMsg.innerText = "Error: Invalid Input";
        statusMsg.style.color = "red";
        return;
    }

    const newItem = {
        id: Date.now(),
        name: name,
        price: price
    };

    dataStore.push(newItem);
    refreshUI();
    
    nameInput.value = "";
    priceInput.value = "";
    statusMsg.innerText = "Success: Item Added";
    statusMsg.style.color = "green";
};

function refreshUI() {
    listBody.innerHTML = "";
    let totalSum = 0;

    for (let i = 0; i < dataStore.length; i++) {
        let item = dataStore[i];
        totalSum += item.price;

        let row = `<tr>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td><button class="delete-btn" onclick="removeItem(${item.id})">Remove</button></td>
                   </tr>`;
        listBody.innerHTML += row;
    }

    totalDisplay.innerText = totalSum.toFixed(2);
}

function removeItem(id) {
    dataStore = dataStore.filter(obj => obj.id !== id);
    refreshUI();
    statusMsg.innerText = "Item Removed";
    statusMsg.style.color = "orange";
}