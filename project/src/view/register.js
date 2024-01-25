import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/auth.js';

const registerTemplate = (onRegister) => html`
 <section id="register">
     <div class="form">
        <h2>Register</h2>
            <form class="register-form" @submit=${onRegister}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
    </div>
 </section>`;


export async function showRegister(ctx){

    ctx.render(registerTemplate(onRegister));

    async function onRegister(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('re-password');
        
        if( !email || email.length ==0 || !rePass || rePass.length ==0 || !password || password.length ==0){
            alert("Empty fields");
            return;
        }

        if(password !== rePass){
            alert("Password and repassword should match!");
            return;
        }

        try{
            await register(email, password);
            ctx.page.redirect('/')

        }catch(err){
            alert(err.message);
            throw err;
        }


    }
}