import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllCars } from '../api/data.js';


const dashTemplate = (allCars) => html`
 <h3 class="heading">Our Cars</h3>
<section id="dashboard">
    ${allCars.length !== 0
    ? html`
        ${allCars.map((car)=>html`
            <div class="car">
                    <img src="${car.imageUrl}" alt="example1" />
                    <h3 class="model">${car.model}</h3>
                    <div class="specs">
                    <p class="price">Price: ${car.price}</p>
                    <p class="weight">Weight: ${car.weight} kg</p>
                    <p class="top-speed">Top Speed: ${car.speed} kph</p>
                    </div>
                    <a class="details-btn" href="/details/${car._id}">More Info</a>
            </div>
        `)} `
    : html`  <h3 class="nothing">Nothing to see yet</h3>`    
    }
</section>
     
`;


export async function showDashboard(ctx){

    let allCars = await getAllCars();
    console.log(allCars, "allCars")

    ctx.render(dashTemplate(allCars));
}