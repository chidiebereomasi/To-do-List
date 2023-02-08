const form = document.querySelector('#list-form');
const listInput = document.querySelector('#list');
const filter = document.querySelector('#filter');
const listMenu = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-lists');


// Load Event Listeners 
loadEventListeners();


// Event Listeners for all
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getLists);
  // Event Listener for the form
  form.addEventListener('submit', addList);
  // Remove List Event
  listMenu.addEventListener('click', removeList);
  // Clear List Event
  clearBtn.addEventListener('click', clearList);
  // Filter List Event
  filter.addEventListener('keyup', filterList);
}

// Get Lists from the Local Storage
function getLists() {
  let lists;
  if(localStorage.getItem('lists') === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }
  lists.forEach(function(list) {
    // Create Li Element
  const li = document.createElement('li');
  // Add a ClassName
  li.className = 'collection-item';
  // Create Textnode and append into Li
  li.appendChild(document.createTextNode(list));
  // Create Link Element
  const link = document.createElement('a');
  // Add a Class
  link.className = 'delete-item secondary-content';
  // Add and Icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append Link to Li
  li.appendChild(link);

  // Append Li to Ul and display
  listMenu.appendChild(li);

  });
}

// Add List 
function addList(e) {
  if(listInput.value === '') {
    alert('Add an item');
  }
  // Create Li Element
  const li = document.createElement('li');
  // Add a ClassName
  li.className = 'collection-item';
  // Create Textnode and append into Li
  li.appendChild(document.createTextNode(listInput.value));
  // Create Link Element
  const link = document.createElement('a');
  // Add a Class
  link.className = 'delete-item secondary-content';
  // Add and Icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append Link to Li
  li.appendChild(link);

  // Append Li to Ul and display
  listMenu.appendChild(li);

  // Store list in LS
    storeListInLocalStorage(listInput.value);

  // Clear Input 
  listInput.value = '';
  
  e.preventDefault();
}

// Store List in Local Storage

function storeListInLocalStorage(list) {
  let lists;
  if(localStorage.getItem('lists') === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }
  lists.push(list);
  localStorage.setItem('lists', JSON.stringify(lists));
}


// Remove LIST from UL

function removeList(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from Local Storage
      removeListFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove From Local Storage
function removeListFromLocalStorage(listItem) {
  let lists;
  if(localStorage.getItem('lists') === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }

  lists.forEach(function(list, index) {
    if(listItem.textContent === list) {
      lists.splice(index, 1);
    }
  });

  localStorage.setItem('lists', JSON.stringify(lists));

}

// Clear List Event
function clearList() {
  listMenu.innerHTML = '';

  // Clear List from LS
    clearListFromLocalStorage();
}

// Clear List from Local Storage
function clearListFromLocalStorage() {
  localStorage.clear();
}


// Filter List Event
function filterList(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(list) {
    const item = list.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      list.style.display = 'block';
    } else {
      list.style.display = 'none';
    }
  });
}