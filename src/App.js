import React, { Component } from 'react';
import './App.css';
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component';

class App extends Component {
  constructor(){
    super();
    this.state = {'text' : 'Hello bro',
                  monsters:[{id:1,name: 'Frankenstein'},{id:2,name: 'Dracula'},{id:3,name: 'Zombie'}],
                  userList:[],
                  search: ''
                };
    this.handleChange = this.handleChange.bind(this);
  }
/**
 * Lifecycle methods runs just after the component is mounted on browser
 */
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(users=>this.setState({userList:users}));
  }

  handleChange(e){
    this.setState({search:e.target.value},()=>console.log(this.state.search))
  }

  //points to class this bydefault
  search = (e)=>{
    this.setState({search:e.target.value},()=>console.log(this.state.search))
  }

  render() {
    const {userList, search} = this.state;
    const filteredUsers = userList.filter(user=> user.name.toLowerCase().includes(search.toLowerCase()))
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox placeholder='Search Monster' handleChange = {this.search}/>
        <SearchBox placeholder='Search Monster(handle change)' handleChange = {this.handleChange}/>
        <CardList people={filteredUsers}/>
        {/* <CardList>{this.state.userList.map(user=><h1 key={user.id}>{user.name}</h1>)}</CardList>  */}
      </div>
    );
  }
}

export default App;
