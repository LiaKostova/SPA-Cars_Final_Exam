import {html, render} from '../node_modules/lit-html/lit-html.js';

import page from '../node_modules/page/page.mjs';
import { logout } from './api/auth.js';
import { clearUserData, getUserData } from './utils.js';
import { showCreate } from './view/create.js';
import { showDashboard } from './view/dashboard.js';
import { showDetails } from './view/details.js';
import { showEdit } from './view/edit.js';
import { showHome } from './view/home.js';
import { showLogin } from './view/login.js';
import { showRegister } from './view/register.js';
import { showSearch } from './view/search.js';


let navTemplate = (user) => html`
<a id="logo" href="/"><img id="logo-car" src="./images/car-logo.png" alt="img"/></a>
        <nav>
          <div>
            <a href="/dashboard">Our Cars</a>
            <a href="/search">Search</a>
          </div>

        ${user
        ? html`
            <div class="user">
                 <a href="/create">Add Your Car</a>
                 <a href="" @click=${onLogout}>Logout</a>
            </div>`
        : html`
            <div class="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>`
        }
        </nav>
`

function decorateCtx(ctx, next){
    ctx.render = function(content){
        render(content, document.querySelector('main'));
    }
    next();
}

function sesstion(ctx, next){
    let user = getUserData();
    if(user){
        ctx.user = user;
    };
    next();
}

function updateNav(ctx, next){
    render(navTemplate(ctx.user), document.querySelector('header'));
    next();
}

function onLogout(){
    logout();
    clearUserData()
}

page(decorateCtx);
page(sesstion);
page(updateNav);

page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/dashboard', showDashboard);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch)

page.start();