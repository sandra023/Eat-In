import React, {Component} from 'react'

class Register extends Component {
    constructor(){
        super()

        this.state={
            registrationUser:{
                email: '',
                password: ''
              },
            currentUser: {},
        }
    }
     
    handleChange= (e) => {
        this.setState({
            registrationUser:{
                ...this.state.registrationUser,
                [e.currentTarget.name]: e.currentTarget.value
            }            
        })
    }

    validateForm(){
        // console.log('validate form')
        return (
            this.state.registrationUser.email.length > 0 && this.state.registrationUser.password.length > 0
        ) 
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const validatedForm = this.validateForm()
        if(validatedForm){
        const register = await fetch('https://eat-in-app.herokuapp.com/users', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state.registrationUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("register", register)
        const parsedRegister = await register.json()
        console.log('response from register: ', parsedRegister)
        if (register.status === 200){
            this.setState({
              currentUser: parsedRegister
            })
            console.log("Successfuly Registered")
          } else {
            console.log("Ahh, that's not it!")
          }
          console.log("currentUser: ", this.state.currentUser)

        this.props.history.push('/recipe')
        this.props.handleLogin(this.state.currentUser);
        }
    }

    render(){
        return(
            <div className="register">
                
              <h1 className="registerTitle">
                  <img className="loginLogo" src="/images/getinLogo.png" alt="Get-In"/>
              </h1>
            <form onSubmit={this.handleSubmit} >
                <label>
                    <input className="textBox" type='text' name='email' placeholder="E-mail Password" onChange={this.handleChange}/>
                </label><br/>
                <label>
                    <input className="textBox" type='text' name='password' placeholder="Password" onChange={this.handleChange}/>
                </label><br/>
                <button className="login" type='submit'>
                    Get-In
                </button>
            </form>
            <br/>
            <div className="logInMessage">
                Already a memeber? <a href="/login">Log-In</a>
            </div>
            </div>
        )
    }

}

export default Register