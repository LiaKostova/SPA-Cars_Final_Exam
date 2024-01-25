import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllSearchedCar } from '../api/data.js';

const searchTemplate = (onSearch, query, allSearchedCars) => {

    return html` 
 <section id="search">
    <div class="form">
            <h4>Search</h4>
            <form class="search-form" @submit=${onSearch}>
                <input type="text" name="search" id="search-input" />
                <button class="button-list">Search</button>
            </form>
    </div>
    <div class="search-result">
        ${query && allSearchedCars
        ? html`
            ${allSearchedCars.map((c)=> html`
            <div class="car">
                <img src="${c.imageUrl}" alt="example1"/>
                <h3 class="model">${c.model}</h3>
                <a class="details-btn" href="/details/${c._id}">More Info</a>
            </div>
            `)} `
        : html` <h2 class="no-avaliable">No result.</h2>`
        }
    </div>
</section>`
}

export async function showSearch(ctx){
    let query;
    let allSearchedCars;
    ctx.render(searchTemplate(onSearch, query, allSearchedCars));

    async function onSearch(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        query = formData.get('search').trim();

        allSearchedCars = await getAllSearchedCar(query);
        ctx.render(searchTemplate(onSearch, query, allSearchedCars));
    }
}