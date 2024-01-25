import {html} from '../../node_modules/lit-html/lit-html.js';
import { createCar } from '../api/data.js';

const createTemplate = (onCreate) => html`

<section id="create">
    <div class="form form-auto">
        <h2>Share Your Car</h2>
            <form class="create-form" @submit=${onCreate}>
              <input type="text" name="model" id="model" placeholder="Model"/>
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Add</button>
            </form>
     </div>
 </section>`;


export async function showCreate(ctx){

    ctx.render(createTemplate(onCreate));

    async function onCreate(e){
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

            await createCar(data);
            ctx.page.redirect('/dashboard')
        }catch(err){
            alert(err.message);
            throw err;
        }

    }
}