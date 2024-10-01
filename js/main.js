let notesArray = [];

const addNote = document.querySelector('#addNote');
const addForm = document.querySelector('#addForm');
const addInput = document.querySelector('#addInput');
const titleInput = document.querySelector('#titleInput');
const saveNote = document.querySelector('#addBtn');
const changeColor = document.querySelector('#changeColorBg');

function displayNotes() {
    addNote.innerHTML = '';

    notesArray.forEach((note, index) => {
        let noteHTML = `
                <div class="nota1">
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>
                    <p onclick="deleteNote(${index})" class="btnEliminar"><i class="bx bx-trash"></i></p>
                </div>`;
        addNote.innerHTML += noteHTML;
    });

    localStorage.setItem('notes', JSON.stringify(notesArray));
}

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (addInput.value.trim() !== '') {
        const newNote = {
            title: titleInput.value,
            content: addInput.value
        };

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Nota guardada!',
            showConfirmButton: false,
            timer: 900
        })

        notesArray.push(newNote);
        titleInput.focus();
        addForm.reset();
        displayNotes();
    }
});

function deleteNote(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la nota de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            notesArray.splice(index, 1);
            displayNotes();

            Swal.fire(
                'Eliminada',
                'La nota ha sido eliminada correctamente.',
                'success'
            )
        }
    });
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