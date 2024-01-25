import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { editTheCarInfo, getTheCar } from '../api/data.js';

const editTemplate = (car, onEdit) => {

    return html`
     <section id="edit">
          <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input type="text" name="model" id="model" placeholder="Model" .value=${car.model} />
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
                .value=${car.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value=${car.price}
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
                .value=${car.weight}
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
                .value=${car.speed}
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
                .value=${car.about}
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>`;
};

export async function showEdit(ctx){

    let carId = ctx.params.id;
    let car = await getTheCar(carId);

    ctx.render(editTemplate(car, onEdit));

    async function onEdit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let model = formData.get('model')

        let imageUrl = formData.get('imageUrl');
        let price = formData.get('price');
        let about = formData.get('about');
        let weight = formData.get('weight');
        let speed = formData.get('speed');

        let data = {model, imageUrl, price, weight, speed, about}


        if( !imageUrl || imageUrl.length ==0 ||
            !about || about.length ==0 ||
            !weight || weight.length ==0 || 
            !speed || speed.length ==0 ||
            !model || model.length==0|| 
            !price || price.length ==0){
            alert("Empty fields");
            return;
        }

        try{
            await editTheCarInfo(carId, data);
            ctx.page.redirect('/details/' +carId);
        }catch(err){
            alert(err.message);
            throw err;
        }

    }
}