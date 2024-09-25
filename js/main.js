let notesArray = [];

const addNote = document.querySelector('#addNote');
const addForm = document.querySelector('#addForm');
const addInput = document.querySelector('#addInput');
const saveNote = document.querySelector('#addBtn');
const changeColor = document.querySelector('#changeColorBg');

function displayNotes() {
    addNote.innerHTML = '';

    notesArray.forEach((element, index) => {
        let noteHTML = `
                <div class="nota1">
                    <p>${element}</p>
                    <p onclick="deleteNote(${index})" class="btnEliminar"><i class="bx bx-trash"></i></p>
                </div>`;
        addNote.innerHTML += noteHTML;
    });

    localStorage.setItem('notes', JSON.stringify(notesArray));
}

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (addInput.value.trim() !== '') {
        notesArray.push(addInput.value);
        addInput.focus();
        addForm.reset();
        displayNotes();
    }
});

function deleteNote(index) {
    notesArray.splice(index, 1);
    displayNotes();
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notesArray = JSON.parse(savedNotes);
        displayNotes();
    }
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem('selectedColor', color);
}

const selectedColor = localStorage.getItem('selectedColor');
if (selectedColor) {
    changeBackgroundColor(selectedColor);
}

document.querySelector('#changeColorBg').addEventListener('click', () => {
    fetch('background.json')
        .then((response) => response.json())
        .then((data) => {
            const colores = data.colores;
            const randomColor = colores[Math.floor(Math.random() * colores.length)];
            changeBackgroundColor(randomColor);
        })
        .catch((error) => {
            console.error('Error', error);
        });
});

document.addEventListener('DOMContentLoaded', loadNotes);   