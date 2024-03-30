const loader = document.getElementById('search-loader');
const card_tag = document.querySelector('.card');
const ulTag = document.querySelector('.card-content');
const msg_card = document.querySelector('.message-card');
const msg = document.querySelector('.msg');
let previous_value = '';

document.getElementById('Search-btn').addEventListener('click', () => {
    call_the_function();
});

document.querySelector('input').onkeydown = (event) => {
    if (event.key === 'Enter') {
        call_the_function();
    };
};

function call_the_function() {
    const searchValue = document.querySelector('input').value.trim();
    if (searchValue !== '' && searchValue !== previous_value) {
        previous_value = searchValue;
        loader.style.display = 'block';
        ulTag.innerHTML = '';
        card_tag.style.display = 'none';
        msg_card.style.display = 'none';

        setTimeout(() => {
            getWordDefinition(searchValue);
        }, 2000);
    };
};

const getWordDefinition = async function (word) {
    const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const info = await data.json();

    loader.style.display = 'none';

    if (Array.isArray(info)) {
        info[0].meanings.forEach(element => {
            if (element.partOfSpeech !== 'conjunction') {
                element.definitions.forEach(def => {
                    const liTag = document.createElement('li');
                    const p_tag = document.createElement('p');
                    p_tag.textContent = def.definition;
                    liTag.appendChild(p_tag);
                    ulTag.appendChild(liTag);
                });
            };
        });
        card_tag.appendChild(ulTag);
        card_tag.style.display = 'block';
    } else {
        msg.innerHTML = info.title;
        msg_card.style.display = 'block';
    };
};