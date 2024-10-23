const searchButton = document.getElementById('search-button');
const randomRecipeButton = document.getElementById('random-recipe-button');
const recipeResults = document.getElementById('recipe-results');
const API_KEY = 'f31d4329ac8443e984d1dae63c1a1882';

searchButton.addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchRecipes(query);
    } else {
        alert('Please enter a recipe name!');
    }
});

randomRecipeButton.addEventListener('click', () => {
    getRandomRecipe();
});

async function searchRecipes(query) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`);
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

async function getRecipeDetails(id) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        const data = await response.json();
        return data.sourceUrl;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        return '#';
    }
}

async function displayRecipes(recipes) {
    recipeResults.innerHTML = '';
    if (recipes && recipes.length > 0) {
        for (const recipe of recipes) {
            const sourceUrl = await getRecipeDetails(recipe.id);
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h2>${recipe.title}</h2>
                <a href="${sourceUrl}" target="_blank">View Recipe</a>
            `;
            recipeResults.appendChild(recipeCard);
        }
    } else {
        recipeResults.innerHTML = '<p>No recipes found. Please try a different search.</p>';
    }
}

async function getRandomRecipe() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`);
        const data = await response.json();
        displayRecipes(data.recipes);
    } catch (error) {
        console.error('Error fetching random recipe:', error);
    }
}


function toggleNav() {
    const navLinks = document.getElementById("nav-links");
    navLinks.style.display = navLinks.style.display === "block" ? "none" : "block";
}
