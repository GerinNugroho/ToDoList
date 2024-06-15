let DATA_ITEM = [];
const btnAdd = document.getElementById('button');
const btnSave = document.getElementById('Save');
const btnLoad = document.getElementById('Load');
const btnReset = document.getElementById('Reset');
const display = document.getElementById('preview');

const renderItem = (index = 0) => {
  display.innerHTML = null;
  for (const data of DATA_ITEM) {
    index += 1;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');

    const Delete = document.createElement('button');
    Delete.type = 'button';
    Delete.setAttribute('id', index - 1);
    Delete.className = 'btnDelete';
    Delete.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
    Delete.onclick = removeItem;

    const text = document.createElement('span');
    text.textContent = `${data}`;

    display.appendChild(li);
    li.appendChild(text);
    li.appendChild(Delete);
  }
};

const addItem = () => {
  let input = document.getElementById('input');
  if (input.value != '') {
    DATA_ITEM.push(input.value);
    input.value = null;
    renderItem();
  } else {
    alert('input dulu!');
  }
};

const removeItem = (evt) => {
  DATA_ITEM.splice(evt.target.getAttribute('id'), 1);
  renderItem();
};

const saveItem = () => {
  let slot = document.getElementById('slot').value;
  let index = 0;
  localStorage.setItem(`${slot}:Length`, DATA_ITEM.length);
  for (const savedArray of DATA_ITEM) {
    index += 1;
    localStorage.setItem(`${slot}:${index}`, savedArray);
  }
  alert('Saved!');
};

const loadItem = () => {
  const slot = document.getElementById('slot').value;
  let index = 0;
  DATA_ITEM.length = 0;
  for (let i = 0; i < localStorage.getItem(`${slot}:Length`); i++) {
    index += 1;
    DATA_ITEM.push(localStorage.getItem(`${slot}:${index}`));
  }
  renderItem();
};

const resetItem = () => {
  let textconfirm = 'Apakah Anda Yakin Ingin Mereset Semua Slot Save?';
  if (confirm(textconfirm)) {
    localStorage.clear();
  }
};

renderItem();
btnAdd.addEventListener('click', addItem);
btnSave.addEventListener('click', saveItem);
btnLoad.addEventListener('click', loadItem);
btnReset.addEventListener('click', resetItem);
