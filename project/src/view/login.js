import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/auth.js';

const loginTemplate = (onLogin) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
    </div>
 </section>`;

 export async function showLogin(ctx){

    ctx.render(loginTemplate(onLogin));
    async function onLogin(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');

        let data = {email, password};
        console.log(data)

        if( !email || email.length ==0 || !password || password.length ==0){
            alert("Please complete all required fields.");
            return;
        }

        try{
            await login(email, password);
            ctx.page.redirect("/")

        }catch(err){
            alert(err.message);
            throw err;
        }
    }
 }