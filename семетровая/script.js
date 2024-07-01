let imageUrls = [];
let currentOpacity = 1;
let deletedImages = [];
let flagMirrorImage = false; 

function Click() {
    const username = document.querySelector('input[type="text"]').value;
    if (username.trim() === '') {
        alert("Введи имя!");
    } else if (!isNaN(username)) {
        alert("Имя не может быть числом!");
    } else {
        const pageDiv = document.querySelector('.page');
        pageDiv.style.display = 'block';
        const pageDiv1 = document.querySelector('.login');
        pageDiv1.style.display = 'none';
        document.getElementById('NameUs').textContent = "Hi, " + username + "!";
    }
}

function Images() {
    fetchImage()
        .then(imageUrl => {
            if (!imageUrls.includes(imageUrl)) {
                imageUrls.push(imageUrl);
            }
            displayImages();
        })
        .catch(error => console.error(error));
}

function displayImages() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    imageUrls.forEach((imageUrl, index) => {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.draggable = true;
        imageElement.dataset.index = index;
        imageElement.ondragstart = dragStart;
        imageElement.ondragover = dragOver;
        imageElement.ondrop = drop;
        imageElement.style.opacity = currentOpacity;
        if (flagMirrorImage) {
            imageElement.style.transform = "scaleX(-1)";
        }
        mainElement.appendChild(imageElement);
    });
}

function showControlPanel() {
    const controlPanel = document.querySelector('.page__content__control-panel');
    if (controlPanel.classList.contains('show')) {
        controlPanel.classList.remove('show');
        setTimeout(() => {
            controlPanel.style.display = 'none';
        }, 500);
    } else {
        controlPanel.style.display = 'block';
        setTimeout(() => {
            controlPanel.classList.add('show');
        }, 10);
    }
}

function updateOpacity(value) {
    currentOpacity = value;
    const images = document.querySelectorAll('main img');
    images.forEach(img => {
        img.style.opacity = value;
    });
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.index);
    event.dataTransfer.dropEffect = 'move';
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function drop(event) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('text/plain');
    const targetIndex = event.target.dataset.index;
    if (draggedIndex !== targetIndex) {
        const draggedImage = imageUrls[draggedIndex];
        imageUrls.splice(draggedIndex, 1);
        imageUrls.splice(targetIndex, 0, draggedImage);
        displayImages();
    }
}

function deleteLastImage() {
    if (imageUrls.length > 0) {
        const lastImage = imageUrls.pop();
        deletedImages.push(lastImage);
        displayImages();
    }
}

function restoreLastDeletedImage() {
    if (deletedImages.length > 0) {
        const lastDeletedImage = deletedImages.pop();
        imageUrls.push(lastDeletedImage);
        displayImages();
    }
}

function duplicateLastImage() {
    if (imageUrls.length > 0) {
        const lastImage = imageUrls[imageUrls.length - 1];
        imageUrls.push(lastImage);
        displayImages();
    }
}

function mirrorImages() {
    const images = document.querySelectorAll('main img');
    flagMirrorImage = !flagMirrorImage;
    if (flagMirrorImage === true) {
        images.forEach(img => {
            img.style.transform = "scaleX(-1)";
        });
    } 
    displayImages();
}