import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// import { async } from 'q';
import RandomRecipe from '../RandomRecipe'

class RecipeContianer extends Component {
    constructor(props){
        super(props)

        this.state = {
            showButtons: true,
            showRecipeModal: false,
            recipes: [],
            ingredients: [],
            instructions: [],
            url: ''
            
 
        }
    }

    getRandomRecipe = async ()=> {
        try{
            const randomRecipes = await fetch(this.state.url)
            const randomRecipesJson = await randomRecipes.json()
            // console.log("recipe", randomRecipesJson.recipes)
            return randomRecipesJson.recipes
        }catch(err){
            // console.log('get random recipes err: ',err)
            return err
        }
        
    }

    handleTermChange = async (e) => {
        const fetchedRecipe = await fetch(`https://api.spoonacular.com/recipes/random?number=1&tags=${e.target.value}&apiKey=e57836c525e04e94a8ec6c22fa9bbf01 `)
        const fetchedRecipeJson = await fetchedRecipe.json()
        // console.log("e: ",e)
        // console.log("url: ",await fetchedRecipeJson)
        this.setState({
            showButtons: false,
            showRecipeModal: true,
                recipes: await fetchedRecipeJson.recipes,
                ingredients: await fetchedRecipeJson.recipes[0].extendedIngredients,
                instructions: await fetchedRecipeJson.recipes[0].analyzedInstructions[0].steps
            })
    }

    render(){
        console.log("this.state", this.state)
        return(
            <div className="recipeContainer">
                {this.state.showRecipeModal ? <RandomRecipe recipes={this.state.recipes} ingredients={this.state.ingredients} instructions={this.state.instructions} /> : null}
                {this.props.currentUser ? <Link to={'/user'}><img className="accountIcon" src="/images/accountIcon.jpg" alt="account icon"/></Link> : <div className="accountIcon"></div>}
                <div className="buttonContainer" style={{display: this.state.showButtons ? 'inline-block' : 'none' }}>
                <button className="button" type="button" value="breakfast" onClick={this.handleTermChange}>Breakfast</button><br/>
                <button className="button" type="button" value="lunch" onClick={this.handleTermChange}>Lunch</button><br/>
                <button className="button" type="button" value="dinner" onClick={this.handleTermChange}>Dinner</button><br/>
                <button className="button" type="button" value="side dish" onClick={this.handleTermChange}>Side Dish</button><br/>
                <button className="button" type="button" value="dessert" onClick={this.handleTermChange}>Dessert</button>
                </div>

        </div>
        )
    }

}

export default RecipeContianer