const searchBtn = document.querySelector('.search-btn')
const food = document.querySelector('#meal')
const RecipeBtn = document.querySelector('.recipe-btn')
const mealDetContent = document.querySelector('.meal-details-content')
const closeBtn = document.querySelector('.close-btn')

closeBtn.addEventListener('click',()=>{
    mealDetContent.parentElement.classList.remove('showRecipe')
})


searchBtn.addEventListener('click', () => {
    let searchText = document.getElementById('search-text').value.trim()

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
    .then(res => res.json())
    .then(data => {
        let html = ""
        const lst = data.meals
        if(lst){
            lst.forEach((item)=> {
                const name = item.strMeal
                const poster = item.strMealThumb
                html += ` <div class="meal-item" data-id="${item.idMeal}">
                <div class="meal-img">
                    <img src="${poster}" alt="">
                </div>
                <div class="meal-name">
                    <h3>${name}</h3>
                    <a class="recipe-btn" href="#">View Recipe</a>
                </div>
                </div>`                
            });
        } 
        food.innerHTML = html
    })
    
})


food.addEventListener('click',(e)=>{
    e.preventDefault()
    let searchText = document.getElementById('search-text').value.trim()

    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res => res.json())
        .then( data =>{
            
            let lst = data.meals
            lst = lst[0]
            console.log(lst)
            let html = `
                <h2 class="recipe-title">
                    ${lst.strMeal}
                </h2>
                <p class="recipe-category">${lst.strCategory}</p>
                <div class="recipe-instruct">
                    ${lst.strInstructions}
                </div>
                <div class="recipe-meal-img">
                    <img src="${lst.strMealThumb}" alt="">
                </div>
                <div class="recipe-link">
                    <a href="${lst.Youtube}">Watch Video</a>
                </div>
                `;
            mealDetContent.innerHTML = html
            mealDetContent.parentElement.classList.add('showRecipe')
        }
        )
    }
})

