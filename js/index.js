let showAllMembers = true;
let currentPage = 1;
const recordsPerPage = 8;

function toggleMembers() {
  showAllMembers = !showAllMembers;
  updateTable();
}

function updateTable() {
  const filterStatus = showAllMembers ? null : 'Active';
  const searchValue = $('.search').val().toLowerCase();

  const filteredCustomers = filterCustomers(
    customers,
    filterStatus,
    searchValue
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

  const paginationText = `Showing data ${startIndex + 1} to ${
    startIndex + currentRecords.length
  } of ${filteredCustomers.length} entries`;
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
        content = `<div class="status-div ${customer[key].toLowerCase()}">${
          customer[key]
        }</div>`;
      }
      row.append($('<td>').html(content));
    }
    tableBody.append(row);
  });
}

function renderPagination(totalPages) {
  const paginationList = $('.pagination-list');
  paginationList.empty();

  const prevItem = createPaginationItem('prev', '&#60;');
  const nextItem = createPaginationItem('next', '&#62;');

  prevItem.click(() => updatePage(-1));
  nextItem.click(() => updatePage(1));

  paginationList.append(prevItem);

  const maxVisiblePages = 5;
  const maxVisiblePagesHalf = Math.floor(maxVisiblePages / 2);

  if (totalPages <= maxVisiblePages) {
    renderPageLinks(1, totalPages);
  } else {
    renderPageLinks(1, maxVisiblePagesHalf);
    paginationList.append('<li class="pagination-dots">...</li>');
    renderPageLinks(totalPages - maxVisiblePagesHalf + 1, totalPages);
  }

  paginationList.append(nextItem);

  function createPaginationItem(className, content) {
    return $(
      `<li class="pagination-item ${className}"><a href="#" class="pagination-link">${content}</a></li>`
    );
  }

  function updatePage(offset) {
    if (currentPage + offset >= 1 && currentPage + offset <= totalPages) {
      currentPage += offset;
      updateTable();
    }
  }

  function renderPageLinks(start, end) {
    for (let i = start; i <= end; i++) {
      const listItem = $('<li class="pagination-item">');
      const link = $(`<a href="#" class="pagination-link">${i}</a>`);
      if (i === currentPage) {
        link.addClass('active');
      }
      listItem.append(link);
      paginationList.append(listItem);

      link.click(() => updatePage(i - currentPage));
    }
  }
}

function filterCustomers(customers, status, searchValue) {
  return customers.filter(
    customer =>
      (!status || customer.status.toLowerCase() === status.toLowerCase()) &&
      customer.name.toLowerCase().includes(searchValue)
  );
}

$(document).ready(() => {
  updateTable();
});

$(function () {
  $('.nav-link').on('click', function (e) {
    e.preventDefault();
    const id = $(this).attr('href');
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    $('.main-wrap > div').hide();
    $(id).show();

    $('.mobile-menu-container').removeClass('is-open');
    $('.icon-menu use').attr('href', './img/icons.svg#icon-menu');
  });

  $('.mobile-menu-open-btn').on('click', function () {
    $('.mobile-menu-container').toggleClass('is-open');

    const iconMenu = $('.icon-menu use');
    const currentIcon = iconMenu.attr('href');

    if (currentIcon === './img/icons.svg#icon-menu') {
      iconMenu.attr('href', './img/icons.svg#icon-close');
    } else {
      iconMenu.attr('href', './img/icons.svg#icon-menu');
    }
  });
});
