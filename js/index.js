// let showAllMembers = true;
// let currentPage = 1;
// const recordsPerPage = 8;

// function toggleMembers() {
//   showAllMembers = !showAllMembers;
//   updateTable();
// }

//  function updateTable() {
//     const filterStatus = showAllMembers ? null : 'Active';
//     const searchValue = $('.search').val().toLowerCase();
  
//     const filteredCustomers = customers.filter(customer =>
//       (!filterStatus || customer.status.toLowerCase() === filterStatus.toLowerCase()) &&
//       (customer.name.toLowerCase().includes(searchValue))
//     );
  
//     addRowsToTable(filteredCustomers);
//   }

//   function addRowsToTable(filteredCustomers) {
//     const table = $('#customers');
//     table.find('tbody').empty();
    
//     filteredCustomers.forEach(customer => {
//       const row = $('<tr>');
//       for (const key in customer) {
//         let content = customer[key];
//         if (key.toLowerCase() === 'status') {
//           content = `<div class="status-div ${customer[key].toLowerCase()}">${customer[key]}</div>`;
//         }
//         row.append($('<td>').html(content));
//       }
//       table.append(row);
//     });
//   }

// $(document).ready(() => {
//   updateTable();
// });
let showAllMembers = true;
let currentPage = 1;
const recordsPerPage = 6;

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

  const totalRecords = filteredCustomers.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  renderPagination(totalPages);
  renderTable(filteredCustomers, currentPage);
}

function renderTable(filteredCustomers, page) {
  const startIndex = (page - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredCustomers.slice(startIndex, endIndex);

  addRowsToTable(currentRecords);

  const paginationText = `Showing data ${startIndex + 1} to ${startIndex + currentRecords.length} of ${filteredCustomers.length} entries`;
  $('.pagination-text').text(paginationText);
}

function addRowsToTable(filteredCustomers) {
  const tableBody = $('#customers tbody');
  tableBody.empty();

  filteredCustomers.forEach(customer => {
    const row = $('<tr>');
    for (const key in customer) {
      let content = customer[key];
      if (key.toLowerCase() === 'status') {
        content = `<div class="status-div ${customer[key].toLowerCase()}">${customer[key]}</div>`;
      }
      row.append($('<td>').html(content));
    }
    tableBody.append(row);
  });
}

function renderPagination(totalPages) {
  const paginationList = $('.pagination-list');
  paginationList.empty();

  const prevItem = $('<li class="pagination-item prev"><a href="#">&#60;</a></li>');
  const nextItem = $('<li class="pagination-item next"><a href="#">&#62;</a></li>');

  prevItem.click(() => {
    if (currentPage > 1) {
      currentPage--;
      updateTable();
    }
  });

  nextItem.click(() => {
    if (currentPage < totalPages) {
      currentPage++;
      updateTable();
    }
  });

  paginationList.append(prevItem);

  for (let i = 1; i <= totalPages; i++) {
    const listItem = $('<li class="pagination-item">');
    const link = $(`<a href="#">${i}</a>`);

    listItem.append(link);
    paginationList.append(listItem);

    link.click(() => {
      currentPage = i;
      updateTable();
    });
  }

  paginationList.append(nextItem);
}

$(document).ready(() => {
  updateTable();
});