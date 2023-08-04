let rowCount = 0;
let header = document.getElementById('header');
let dataArray = JSON.parse(localStorage.getItem('data')) || [];

window.onload = function () {
  rowCount = dataArray.length;
  dataArray.forEach(data => {
    getdata(data);
  });
};

function save() {
  let name = document.getElementById("name").value;
  let category = document.getElementById("category").value;

  if (name && category) {
    if (!editingRow) {
      rowCount++;
      let data = {
        id: rowCount,
        name: name,
        category: category,
      };
      dataArray.push(data);
    } else {

      let editedDataIndex = dataArray.findIndex(data => data.id === editingRow);
      if (editedDataIndex !== -1) {
        dataArray[editedDataIndex].name = name;
        dataArray[editedDataIndex].category = category;
      }
    }

    localStorage.setItem('data', JSON.stringify(dataArray));

    let table = document.getElementById("dataTable");
    if (!editingRow) {
      let row = table.insertRow();
      let numberCell = row.insertCell(0);
      let nameCell = row.insertCell(1);
      let categoryCell = row.insertCell(2);
      let actionCell = row.insertCell(3);

      numberCell.innerHTML = rowCount;
      nameCell.innerHTML = name;
      categoryCell.innerHTML = category;
      actionCell.innerHTML = "<button onclick='deleteData(this)'>Delete</button> <button onclick='editData(this)'>Edit</button>";
    } else {
      let row = table.rows[editingRow];
      row.cells[1].innerHTML = name;
      row.cells[2].innerHTML = category;
    }

    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    editingRow = 0;
  } else {
    header.innerHTML = "Fill both the name and category fields";
  }
}

let editingRow = 0;

function getdata(data) {
  let table = document.getElementById("dataTable");
  let row = table.insertRow();

  let numberCell = row.insertCell(0);
  let nameCell = row.insertCell(1);
  let categoryCell = row.insertCell(2);
  let actionCell = row.insertCell(3);

  numberCell.innerHTML = data.id;
  nameCell.innerHTML = data.name;
  categoryCell.innerHTML = data.category;
  actionCell.innerHTML = ` <button onclick='deleteData(this)'>Delete</button> 
  <button onclick='editData(this)'>Edit</button>`;

  rowCount = data.id;
}

function deleteData(button) {
    let row = button.parentNode.parentNode;
    let rowIndex = row.rowIndex;
    let dataId = row.cells[0].innerHTML;
    dataArray = dataArray.filter(data => data.id !== parseInt(dataId));
    localStorage.setItem('data', JSON.stringify(dataArray));
    document.getElementById("dataTable").deleteRow(rowIndex);

  rowCount = dataArray.length;
  updateRowNumbers();
  }


function editData(button) {
  let row = button.parentNode.parentNode;
  let rowIndex = row.rowIndex;
  let dataId = parseInt(row.cells[0].innerHTML);

  let name = row.cells[1].innerHTML;
  let category = row.cells[2].innerHTML;

  document.getElementById("name").value = name;
  document.getElementById("category").value = category;

  editingRow = dataId;
  header.innerHTML = "Edit row of: " + dataId;
}

// function updateRowNumbers() {
//   let table = document.getElementById("dataTable");
//   for (let i = 1; i < table.rows.length; i++) {
//     table.rows[i].cells[0].innerHTML = i;
//   }
// }

