const form = document.querySelector('#searchForm');
const resultsDisplay = document.querySelector('#resultsContainer');

let searchQuery = '';

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log('form submitted');
    searchQuery = form.elements.query.value;
    //await getData promise for response then move on
    const results = await getData(searchQuery);
    clear();
    makeResult(results);
    console.log(results);
    form.elements.query.value = '';

})


const getData = async (query) => {
    try {
        // const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
        const config = {params: {q: query}}
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=`, config)
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

const makeResult = (shows) => {

    for (let result of shows) {

        const card = document.createElement('div');
        card.className = 'card my-3 mx-auto border border-4 overflow-auto';
        card.style.width = '18rem';
        card.style.height = '40rem';

        if (result.show.image) {
            const imageURL = result.show.image.medium;
            const a = document. createElement('a');
            const img = document.createElement('img');

            a.href = result.show.url;
            a.target = '_blank';

            img.id = 'img'
            img.className = 'card-img-top p-2';
            img.src = imageURL;
            a.append(img);

            card.append(a);

            resultsDisplay.append(card);
        }
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body h-50 d-inline-block';

        const showName = result.show.name;
        const showRating = (result.show.rating.average);

        const titleTag = document.createElement('h5');
        const ratingTag = document.createElement('h6');

        const p = document.createElement('p');
        p.className = 'card-text';
        p.innerHTML = result.show.summary;

        titleTag.textContent = `${showName}`;
        titleTag.className = 'card-title text-center';

        if(showRating){
            ratingTag.textContent = `Rating: ${showRating} /10`;
            if(showRating >= 7){
                // ratingTag.classList.add('text-success');
                ratingTag.className = 'text-success card-title text-center'
            }
            if(showRating < 7){
                ratingTag.className = 'text-warning card-title text-center'
            }
        } else{
            ratingTag.textContent = 'Rating: N/A'
        }


        cardBody.append(titleTag);
        cardBody.append(ratingTag);
        cardBody.append(p);
        card.append(cardBody);

    }
}

const clear = () => {
    const cards = document.querySelectorAll('.card');

    for (let card of cards) {
        card.remove();
    }
}

