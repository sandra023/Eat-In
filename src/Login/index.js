import React, {Component} from 'react'

class Login extends Component {
    constructor(props){
        super(props)

        this.state=({
            loginUser: {
              email: '',
              password: ''
            },
            currentUser: {},
        })
    }

    validateForm(){
        // console.log('validate form')
        return (
            this.state.loginUser.email.length > 0 && this.state.loginUser.password.length > 0
        ) 
    }
    handleChange = (e) => {
        // console.log('handle Change')
        this.setState({
          loginUser:{
            ...this.state.loginUser,
            [e.target.name]: e.target.value
          }
        })
    }

    loginUser = async (e) => {
        e.preventDefault();
        console.log("this.state.loginUser",this.state.loginUser)
        const validatedForm = this.validateForm()
        if(validatedForm){
          const login = await fetch('https://eat-in-app.herokuapp.com/auth/login', {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify(this.state.loginUser),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
        
          console.log("login",login);
        
          const parsedLogin = await login.json()
          console.log('response from login: ', parsedLogin)
          if (login.status === 200){
            this.setState({
              currentUser: parsedLogin
            })
          } else {
            console.log("Ahh, that's not it!")
          }

          //check if response is successful


          console.log("currentUser: ", this.state.currentUser)
          this.props.history.push('/recipe')
          this.props.handleLogin(this.state.currentUser);
        }
       
      }

    render() {
        return(
        <div className="loginModal">
          <div className="column">
            <h2 className="div3">
              <div className="content">
                <img className="loginLogo" src="/images/login2.png" alt="Log-In"/>
              </div>
            </h2>
          <form onSubmit={this.loginUser} >
        <label>
              <input className="textBox" type='text' name='email' placeholder="E-mail Address" onChange={this.handleChange}/>
          </label><br/>
          <label>
              <input className="textBox" type='password' name='password' placeholder="Password" onChange={this.handleChange}/>
          </label><br/>
          <button className="login" type='submit'>
                    Login
          </button>
        </form>
        <br/>
          <div className="logInMessage">
            New to us? <a href="/register">Sign Up</a>
          </div>
        </div>
      </div>

         
    );
  }
}

export default Login



