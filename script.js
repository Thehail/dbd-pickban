const images = Array.from({ length: 38 }, (_, i) => `images/image${i + 1}.png`);
const names = [
    "The Trapper", "The Wraith", "The Hillbilly", "The Nurse", "The Shape", "The Hag",
    "The Doctor", "The Huntress", "The Cannibal", "The Nightmare", "The Pig", "The Clown",
    "The Spirit", "The Legion", "The Plague", "The Ghost Face", "The Demogorgon", "The Oni",
    "The Deathslinger", "The Executioner", "The Blight", "The Twins", "The Trickster", "The Nemesis",
    "The Cenobite", "The Artist", "The Onryō", "The Dredge", "The Mastermind", "The Knight",
    "The Skull Merchant", "The Singularity", "The Xenomorph", "The Good Guy", "The Unknown", "The Lich", "The Dark Lord", "The Houndmaster"
];
const sequence = ['ban', 'ban', 'pick', 'pick', 'ban', 'ban', 'pick', 'pick', 'ban', 'ban', 'pick'];
let currentStep = 0;
let banCount = 0;
const initialContainer = document.getElementById('initialContainer');
const pickBanContainer = document.getElementById('pickBanContainer');
let selectedImagesCount = 0;
const selectedImages = [];

images.forEach((image, idx) => {
    const item = document.createElement('div');
    item.classList.add('item-container'); // Changed class name to distinguish it
     item.innerHTML = `<div class="item"><img src="${image}" alt="Character ${idx + 1}"></div><div class="name-box">${names[idx]}</div>`;


    item.addEventListener('click', () => handleImageSelection(item, idx));
    initialContainer.appendChild(item);
});

function handleImageSelection(item, index) {
    if (selectedImagesCount >= 11) return;
  item.removeEventListener('click', () => handleImageSelection(item, index));

    selectedImagesCount++;

    const clonedItem = item.cloneNode(true);
    selectedImages.push({item: clonedItem, index:index});
    pickBanContainer.appendChild(clonedItem);
      item.style.visibility = 'hidden';
            item.style.pointerEvents = 'none';

    if (selectedImagesCount === 11) {
        initialContainer.remove();
        pickBanContainer.style.display = 'flex';
                selectedImages.forEach(({item, index}) => {
          item.addEventListener('click', () => handlePickBan(item, index));
        })
    }
}


function handlePickBan(item, index) {
    if (item.classList.contains('banned') || item.classList.contains('picked')) return;
    const action = sequence[currentStep % sequence.length];
  item.querySelector('.item').classList.add(action === 'ban' ? 'banned' : 'picked');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    if (action === 'ban') {
        overlay.classList.add('banned');
        overlay.textContent = 'Banned';
    } else {
        overlay.classList.add('picked');
        overlay.textContent = 'Picked';
    }
    item.querySelector('.item').appendChild(overlay);

    currentStep++;
    if (action === 'ban') banCount++;

    if (banCount === 6) {
        const remainingItems = [...pickBanContainer.querySelectorAll('.item-container')].filter(item => !item.querySelector('.item').classList.contains('banned') && !item.querySelector('.item').classList.contains('picked'));
          remainingItems.forEach(remainingItem => {
          remainingItem.querySelector('.item').classList.add('picked');
          const lastOverlay = document.createElement('div');
          lastOverlay.classList.add('overlay', 'picked');
          lastOverlay.textContent = 'Picked';
          remainingItem.querySelector('.item').appendChild(lastOverlay);
         });
      }
}