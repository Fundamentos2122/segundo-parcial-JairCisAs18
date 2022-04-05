const formRecipe=document.getElementById("form-recipe");
const formGroup=document.getElementsByClassName("form-group");
const recipeList=document.getElementById("view");
const keyList="recipeList";

document.addEventListener("DOMContentLoaded", function() {
    //Agregar evento al formulario
    formRecipe.addEventListener("submit", submitRecipe);
    paintRecipeList();
});

function submitRecipe(e) {
    e.preventDefault();
    e.stopPropagation();

    let recipe = {
        nombre: formRecipe["title"].value,
        imagen: formRecipe["img_url"].value,
        descripcion: formRecipe["description"].value
    };
    let list = getRecipe();
    list.push(recipe);
    localStorage.setItem(keyList, JSON.stringify(list));
    paintRecipeList();
}

function getRecipe() {
    let list = JSON.parse(localStorage.getItem(keyList));
    if (list === null) {
        return [];
    }
    else {
        return list;
    }
}

function paintRecipeList(){
    let list = getRecipe();
    let html = '';
    for(var i = 0; i < list.length; i++) {
        html += 
            `<h1 class="[ color-primary ] [ text-center ]">Listado de recetas</h1>
            <div class="[ row ] [ flex ]" data-state="wrap">
                <div class="[ col ]">
                    <div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" card-id="${list[i].id}">
                        <img src="${list[i].img_url}" alt="">
                        <div class="[ flow ]">
                            <h5>${list[i].title}</h5>
                            <div class="[ flex ]" data-state="justify-between">
                                <button class="[ btn ]" data-state="white" onclick="getRecipe(${list[i].id})">Ver</button>
                                <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${list[i].id})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <h1 class="[ color-primary ] [ text-center ]">Receta</h1>
    
            <div class="[ recipe ] [ flex ] [ shadow ]">
                <div class="recipe-img">
                    <img src="${formRecipe.img_url}" alt="">
                </div>
                <div class="[ recipe-info ] [ flow ]">
                    <h2>${formRecipe.title}</h2>
                    <div class="[ text-justify ]">${formRecipe.description}</div>
                    <h5>Ingredientes</h5>
                    <ul class="[ recipe-ing ] [ flex ]" data-state="wrap">
                        <li>${list[i]}</li>
                    </ul>
                </div>
            </div>
    
            <div class="text-right">
                <button class="[ btn ]" data-state="primary" onclick="paintRecipeList()">Volver al listado</button>
            </div>`
    }
    recipeList.innerHTML=html;
}
function deleteRecipe(id) {
    let list = getRecipe();

    list = list.filter(i => i.id !== id);

    localStorage.setItem(keyList, JSON.stringify(list));

    let recipe = document.getElementById(id);

    recipe.className += ' hide';

    setTimeout(() => {
        recipe.remove();
    }, 300);
}