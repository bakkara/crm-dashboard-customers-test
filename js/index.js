let showAllMembers = true;

function toggleMembers() {
  showAllMembers = !showAllMembers;
  updateTable();
}

function updateTable() {
  const filterStatus = showAllMembers ? null : 'Active';
  addRowsToTable(filterStatus);
}

function addRowsToTable(filterStatus) {
  const table = $('#customers');
  table.find('tbody').empty();
  customers.forEach(customer => {
    if (!filterStatus || customer.status.toLowerCase() === filterStatus.toLowerCase()) {
      const row = $('<tr>');
      for (const key in customer) {
        if (key.toLowerCase() === 'status') {
            // Додаємо клас відповідно до статусу
            cellContent = `<div class="status-div ${customer[key].toLowerCase()}">${customer[key]}</div>`;
          } else {
            cellContent = customer[key];
          }
        row.append($('<td>').html(cellContent));
      }
      table.append(row);
    }
  });
}

$(document).ready(() => {
  updateTable();
});