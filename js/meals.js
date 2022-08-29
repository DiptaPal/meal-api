document.getElementById('spinner').style.display = 'none';
const loadMeals = (search) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
    .catch(error => console.log(error))
}
const displayMeals = (meals) =>{
    document.getElementById('spinner').style.display = 'none';
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div onclick='loadMealDetails(${meal.idMeal})' class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
            </div>
        </div>
        `
        mealContainer.appendChild(mealDiv);
    });
}
const searchMeal = () => {
    document.getElementById('spinner').style.display = 'block';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadMeals(searchText);
    searchField.value = '';
}

const loadMealDetails = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = (meal) =>{
    const mealDetailContainer = document.getElementById('mealDetail-container');
    mealDetailContainer.textContent = '';
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card');
    mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
        </div>
    `
    mealDetailContainer.appendChild(mealDiv);
}
loadMeals('');
