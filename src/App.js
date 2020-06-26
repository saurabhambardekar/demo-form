import React, { Component } from 'react'
import axios from 'axios';


export default class App extends Component {
  state = {
    users :[],
    name: "",
    sex: "",
    typeofproduct: "",
    edit:false,
    editname:"",
    editid: 0,
    editsex: "",
    edittype: ""
  }
  componentDidMount(){
      const url = 'http://localhost:8000/users'
      fetch(url)
      .then(response => response.text())
      .then(contents => {
        const data = JSON.parse(contents)
        this.setState({users:data})
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

  }
  addUser = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    axios.post(`http://localhost:8000/users/add`,{name:this.state.name,sex:this.state.sex,typeofproduct:this.state.typeofproduct})
    .then(res=>console.log(res.status))
    .catch(err=>{
      if (err) throw err
    })
  }
  newName =(e)=> {
    this.setState({
      name:e.target.value
    })
  }
  newSex =(e)=>{
    this.setState({
      sex:e.target.value
    })
  }
  newType = (e) =>{
    this.setState({
      typeofproduct:e.target.value

    })
  }

  deleteElement = (e) => {
    axios.post(`http://localhost:8000/users/delete?id=${e}`)
    .catch(err=>{if (err){
      console.log(err)
    }})

  }
  editElement = (id,name,sex,typeofproduct) =>{
    this.setState(
      {
        edit:!this.state.edit,
        editname:name,
        editid:id,
        editsex:sex,
        edittype:typeofproduct
      }
    )
    }
  editEl = (e) =>{
    console.log(e)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.addUser}>
          <input type="text" placeholder="name" name="n" onChange={this.newName}></input>
          <label  name= "male" >male</label>
          <input type="radio" id="m" name="m" value="male" onChange={this.newSex}></input>
          <label name= "female">female</label>
          <input type="radio" id="f" name="f" value="female" onChange={this.newSex}></input>
          <label name= "other">other</label>
          <input type="radio" id="o" name="o" value="other" onChange={this.newSex}></input>

          <select name="typeofproduct" id="typeofproduct" onChange={this.newType}>
            <option value="A">A</option>
            <option value="B">B</option> 
            <option value="C">C</option>
            <option value="M">M</option>
          </select>
          <input type="submit"/>
        </form>
        <div>
          <table style={{border:"1px solid black"}}>
            <thead style={{border:"1px solid black"}}>  
              <td>NAME</td>
              <td>SEX</td>
              <td>TYPE OF PRODUCT</td>
              <td>EDIT/DELETE</td>
            </thead>
            <tbody style={{border:"1px solid black"}}>
          {this.state.users.map((data)=>
          
          <tr name={data.id} style={{border:"1px solid black"}}>
              <td>{data.name}</td>
              <td>{data.sex}</td>
              <td>{data.typeofproduct}</td>
              <td><button onClick={()=>this.editElement(data.id,data.name,data.sex,data.typeofproduct)}>EDIT</button><button onClick={(e)=>this.deleteElement(data.id)}>DELETE</button></td>
            </tr>
          )}
          
          </tbody>
          </table>
        </div>
      </div>
    )
  }
}

