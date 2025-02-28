var selectedRow = null;

function onFormSubmit() {
    event.preventDefault();
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData);
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["vinylCode"] = document.getElementById("vinylCode").value;
    formData["vinylName"] = document.getElementById("vinylName").value;
    formData["qty"] = document.getElementById("qty").value;
    formData["price"] = document.getElementById("price").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.vinylCode;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.vinylName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.qty;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.price;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("vinylCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("vinylName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("price").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.vinylCode;
    selectedRow.cells[1].innerHTML = formData.vinylName;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.price;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("storeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function deleteAll() {
    if (confirm('Are you sure to delete all records ?')) {
        var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
        while (table.rows.length > 0) {
            table.deleteRow(0);
        }
        resetForm();
    }
}

function resetForm() {
    document.getElementById("vinylCode").value = "";
    document.getElementById("vinylName").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("price").value = "";
    selectedRow = null;
}

var cart = [];

function addToCart(vinylName, price) {
    var existingItem = cart.find(item => item.vinylName === vinylName);
    if (existingItem) {
        existingItem.qty++;
        existingItem.total = existingItem.qty * existingItem.price;
    } else {
        cart.push({ vinylName: vinylName, price: price, qty: 1, total: price });
    }
    renderCart();
}

function renderCart() {
    var table = document.getElementById("cartList").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    cart.forEach(item => {
        var newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${item.vinylName}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.qty}" min="1" onchange="updateCartItem('${item.vinylName}', this.value)"></td>
            <td>$${item.total.toFixed(2)}</td>
            <td>
                <button onclick="removeFromCart('${item.vinylName}')">Remove</button>
            </td>
        `;
    });
}

function updateCartItem(vinylName, qty) {
    var item = cart.find(item => item.vinylName === vinylName);
    if (item) {
        item.qty = parseInt(qty);
        item.total = item.qty * item.price;
        renderCart();
    }
}

function removeFromCart(vinylName) {
    cart = cart.filter(item => item.vinylName !== vinylName);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}