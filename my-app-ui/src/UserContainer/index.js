import React, {Component} from 'react'


class User extends Component {
    constructor(props){
        super(props)

        this.state={
        currentUser: {
            id: '',
            email: '',
            password: ''        
        },
        userToEdit:{
            id: null,
            email: '',
            password: '' 
        }
        }
    }

    setUser =() => {
        this.setState({
        currentUser: this.props.currentUser,
        userToEdit: this.props.currentUser
    })
    }
    
    componentDidMount =()=> {
        this.setUser();
    }

    deleteAccount = async (e)=> {
        e.preventDefault();
        console.log('user from delete route: ', this.state.currentUser)

        try{
            const deleteRequest = await fetch ('http://localhost:8080/users/'+this.state.currentUser.id, {
                method: 'DELETE',
                credentials: 'include'
            })
            if(deleteRequest.status !== 200){
                throw Error ("Delete Request Not Working")
            }
            this.setState({
                currentUser: ''
            })
            if(this.state.currentUser===''){
                this.props.history.push('/')
            }
        }catch (err){
            return(err)
        }
        this.props.handleLogin(this.state.currentUser);

    }

    handleFormChange = (e) => {
        // e.preventDefault()
        this.setState({
            userToEdit: {...this.state.userToEdit,
            [e.target.name]: e.target.value}
        })
 
        console.log("user to edit handle for change", this.state.userToEdit)
    }

    editAccount = async (e) => {
        e.preventDefault();
        console.log("user to edit : edit route ", this.state.userToEdit)
        console.log("this.state.currentUser", this.state.currentUser)

        try{
            const editRequest = await fetch ('http://localhost:8080/users/'+this.state.currentUser.id, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(this.state.userToEdit),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            if(editRequest.status !== 200){
                throw Error('Edit Request Not Working')
            }
            const editResponse = await editRequest.json()
            console.log("editResponse: ",editResponse)

        }catch(err){
            console.log('Error from edit route: ', err)
            return(err)
        }
        this.setState({
            currentUser: this.state.userToEdit
        })
        alert("You're account has been updated!")
        console.log("this.state.currentUser", this.state.currentUser)
        console.log("this.props.currentUser", this.props.currentUser)
        this.props.handleLogin(this.state.currentUser);


    }


    isLoggedin = () => {
        if(this.state.currentUser){
            return(
                <div className="editInfo">
                <div className="editHeader">
                    <h1 className='editHeader'>Edit Your Account</h1>
                </div>
            <div className="editBody">
                <form onSubmit={this.editAccount}>  
                    <input className="textBox" placeholder={this.state.currentUser.email} type="email" name="email" onChange={this.handleFormChange} /><br/>
                    <input className='textBox' placeholder="********" type="password" name="password"  onChange={this.handleFormChange}/><br/>
                    <input className='login' id="uploadButton" type='submit' value="Update Info!"/>
                </form>
            </div><br/>
            <section>
                <button className="deleteButton" onClick={this.deleteAccount}>Delete Account</button>
            </section>
        </div>
            )
        } else {
            this.props.history.push('login')
        }
    }

    render(){
        console.log("currentUser from render: ", this.state.currentUser)
        return(
            <div>
             {this.isLoggedin()}
            </div>
        )
    }
}

export default User
