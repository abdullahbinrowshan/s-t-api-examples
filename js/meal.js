const loadMeals = (search) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => console.log(error))
}

const displayMeals = meals => {
    const mealsContainer = document.getElementById('meal-container');
    mealsContainer.innerHTML = '';
    meals.forEach(meal => {
        mealsContainer.innerHTML += `
        <div class="col" onclick="mealDetail(${meal.idMeal})">
            <div class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text" title="${meal.strInstructions}">${meal.strInstructions.slice(0, 100)}...</p>
                </div>
            </div>
        </div>
        `
    });
}

const mealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = mealDetails => {
    const mealDetailsContainer = document.getElementById('meal-details')
    console.log(mealDetails);
    mealDetailsContainer.innerHTML = `
    <div class="card mb-3">
        <img src="${mealDetails.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${mealDetails.strMeal}</h5>
            <p class="card-text">${mealDetails.strInstructions}</p>
            <p class="card-text"><small class="text-muted">${ mealDetails.strTags}</small></p>
        </div>
    </div>
    `
}

const searchFood = () => {
    const searchFieldValue = document.getElementById('search-field').value;
    loadMeals(searchFieldValue)
}
