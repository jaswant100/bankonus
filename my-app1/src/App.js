import React, { Component,PureComponent } from 'react'
import datajson from './bankon.json'
import pic1 from './assets/images/Health-Insurance-For-Family.jpg'
import './App.css';
class App extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      list:[]
    }
  }
  componentDidMount=()=>{
    this.setState({list:datajson})
  }
  cardload(){
    const {list} = this.state;
    if(list === undefined || list.length === 0){
      return null
    }
return list.map((data,i)=>{
  console.log('render')
  return (
    <div className="card mr-2 mb-2" key={i} style={{width: 18+'rem'}}>
  <img src={pic1} className="card-img-top" alt="images" style={{width: 18+'em'}}/>
  <div className="card-body">
    <h5 className="card-title">{data.provider['en-ae'].name}</h5>
    <p className="card-text">{data.provider['en-ae'].description}</p>
    <a href={data.provider['en-ae'].terms_conditions_url} className="btn btn-primary">Terms and Conditions</a>
  </div>
</div>
  )
})
  }
  render() { 
    return (
    <div className="container">
<div className="row justify-content-start">
   {this.cardload()}
   </div>
  </div>
  );
  }
}
 
export default App;

