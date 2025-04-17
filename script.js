let guests = [];
let groups = [];

function addGuest() {
  const name = document.getElementById('guestName').value.trim();
  if (name && !guests.includes(name)) {
    guests.push(name);
    document.getElementById('guestList').innerHTML += `<li>${name}</li>`;
    document.getElementById('guestName').value = '';
  }
}

function goToGrouping() {
  document.getElementById('guest-section').style.display = 'none';
  document.getElementById('group-section').style.display = 'block';
  const groupForm = document.getElementById('groupForm');
  groupForm.innerHTML = '';

  guests.forEach((guest, index) => {
    groupForm.innerHTML += `<input type="checkbox" id="chk_${index}" value="${guest}"> ${guest}<br>`;
  });

  const createGroupBtn = document.createElement('button');
  createGroupBtn.textContent = 'Create Group from Selected';
  createGroupBtn.addEventListener('click', createGroup);
  groupForm.appendChild(createGroupBtn);

  const groupsDisplay = document.createElement('div');
  groupsDisplay.id = 'groupsDisplay';
  groupForm.appendChild(groupsDisplay);
}

function createGroup() {
  const selected = [];
  guests.forEach((guest, index) => {
    if (document.getElementById(`chk_${index}`).checked) {
      selected.push(guest);
      document.getElementById(`chk_${index}`).checked = false;
    }
  });
  if (selected.length > 0) {
    groups.push(selected);
    document.getElementById('groupsDisplay').innerHTML += `<div class="group-box">Group: ${selected.join(', ')}</div>`;
  }
}

function finalizeGroups() {
  const addedGuests = groups.flat();
  guests.forEach(g => {
    if (!addedGuests.includes(g)) {
      groups.push([g]);
    }
  });

  document.getElementById('group-section').style.display = 'none';
  document.getElementById('order-section').style.display = 'block';
  const orderForm = document.getElementById('orderForm');

  groups.forEach((group, i) => {
    orderForm.innerHTML += `
      <div class="group-box">
        <strong>${group.length > 1 ? 'Group' : 'Person'}: ${group.join(', ')}</strong><br>
        <textarea id="order_${i}" rows="3" placeholder="Enter order..."></textarea><br>
        <button class="edit-btn" onclick="editOrder(${i})">Edit Order</button>
      </div>
    `;
  });
}

function showFinalOrder() {
  document.getElementById('order-section').style.display = 'none';
  document.getElementById('final-order').style.display = 'block';
  let summary = '';
  groups.forEach((group, i) => {
    const order = document.getElementById(`order_${i}`).value;
    summary += `${group.join(', ')}:\n${order}\n\n`;
  });
  document.getElementById('orderSummary').innerText = summary;
}

function editOrder(index) {
  document.getElementById('final-order').style.display = 'none';
  document.getElementById('order-section').style.display = 'block';
  document.getElementById(`order_${index}`).focus();
}

document.getElementById('addGuestBtn').addEventListener('click', addGuest);
document.getElementById('goToGroupingBtn').addEventListener('click', goToGrouping);
document.getElementById('finalizeGroupsBtn').addEventListener('click', finalizeGroups);
document.getElementById('showFinalOrderBtn').addEventListener('click', showFinalOrder);
