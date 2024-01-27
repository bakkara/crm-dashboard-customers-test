let showAllMembers = true;

function toggleMembers() {
  showAllMembers = !showAllMembers;
  updateTable();
}

 function updateTable() {
    const filterStatus = showAllMembers ? null : 'Active';
    const searchValue = $('.search').val().toLowerCase();
  
    const filteredCustomers = customers.filter(customer =>
      (!filterStatus || customer.status.toLowerCase() === filterStatus.toLowerCase()) &&
      (customer.name.toLowerCase().includes(searchValue))
    );
  
    addRowsToTable(filteredCustomers);
  }

  function addRowsToTable(filteredCustomers) {
    const table = $('#customers');
    table.find('tbody').empty();
    
    filteredCustomers.forEach(customer => {
      const row = $('<tr>');
      for (const key in customer) {
        let content = customer[key];
        if (key.toLowerCase() === 'status') {
          content = `<div class="status-div ${customer[key].toLowerCase()}">${customer[key]}</div>`;
        }
        row.append($('<td>').html(content));
      }
      table.append(row);
    });
  }

$(document).ready(() => {
  updateTable();
});