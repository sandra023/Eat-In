import React from 'react'

const RandomRecipe = (props) =>{
    // console.log('props in Recipe list ->', props)
    // console.log("[0] :", props.recipes[0])
    
    const handleFavoritesClick = (e) =>
    {
        console.log("Favorites button clicked");
    }
    
    const handleHomeClick = (e) =>
    {
        console.log("Home button clicked");
    }
    
    const recipeList = props.recipes.map((recipe) =>{
    
        return (
            <div className="recipeHeader" key={recipe.id}>
                <h1><a href="/recipe"><button className="homeButton" onClick={handleHomeClick}><img src="/images/home-icon.jpg" width="30" height="30" alt="submit"/></button></a><button className="favoritesButton" onClick={handleFavoritesClick}><img src="/images/favorites-icon.png" width="30" height="30" alt="submit"/></button></h1>
                <h1 className="recipeTitle">{recipe.title}</h1>
                <img className="img" src={recipe.image} alt={recipe.title}/>
            </div>
        )
    })
    const ingredientList = props.ingredients.map((ingredient) => {
        return(
            <li key={'ingredient '+ingredient.id} className="ingredient">{ingredient.original}</li>
        )
    })
    const instructions = props.instructions.map((instruction,index) => {
        return(
            <li key={index}>{instruction.id} {instruction.number}. {instruction.step}</li>
        )
    })
    return(
        <div className="recipe">
            
            {recipeList}
            <h2>Ingredients</h2>
            <ul className="ingredients">
            {ingredientList}
            </ul>
            <br/>
            <h2>Instructions</h2>
            <ul className="instructions">
            {instructions}
            </ul>
        </div>
    )
}

export default RandomRecipe