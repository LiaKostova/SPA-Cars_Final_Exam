import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { deleteTheCar, getTheCar } from '../api/data.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (car, isCreator, onDelete) => html`
 <section id="details">
    <div id="details-wrapper">
            <img id="details-img" src="${car.imageUrl}" alt="example1" />
            <p id="details-title">${car.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="price">Price: ${car.price}</p>
                <p class="weight">Weight: ${car.weight} kg</p>
                <p class="top-speed">Top Speed: ${car.speed} kph</p>
                <p id="car-description">${car.about}</p>
              </div>
           
              ${isCreator
                ? html` 
                <div id="action-buttons">
                     <a href="/edit/${car._id}" id="edit-btn">Edit</a>
                     <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
                </div>`
                :nothing
                }
             
            </div>
    </div>
</section>
`;

export async function showDetails(ctx){
    let carId = ctx.params.id;
    let car = await getTheCar(carId);
    let ownerId = car._ownerId

    let userId = getUserData()?._id;

    let isCreator = false;

    if(ownerId === userId){
        isCreator = true;
    }

    ctx.render(detailsTemplate(car, isCreator, onDelete));
    
    async function onDelete(){
        let choice = confirm('Are you sure you want to delete this car?');
        if(choice){
            await deleteTheCar(carId);
            ctx.page.redirect('/dashboard')
        }
    }
}