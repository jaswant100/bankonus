import React, { Component, Fragment, PureComponent } from 'react'
import datajson from './bankon.json'
import pic1 from './assets/images/Health-Insurance-For-Family.jpg'
import './App.css';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MainList: [],
      list: [],
      select1: ''
    }
  }
  componentDidMount = () => {
    this.setState({ MainList: datajson, list: datajson })
  }
  selectChange1 = (i, data, e) => {
    const { list } = this.state
    let arr = data.covers.filter((data2, j) => data2.name === e.target.value);
    if (arr[0]?.options !== undefined && arr[0].length !== 0 && arr[0].type !== "excluded") {
      arr[0].options.forEach((data3, l) => {
        list[i].text = data3.text;
        list[i].cost = data3.cost
      })
    }
    else {
      list[i].text = undefined;
      list[i].cost = undefined
    }
    this.setState({ select1: e.target.value, list })
  }
  cardload() {
    const { list } = this.state;
    if (list === undefined || list.length === 0) {
      return null
    }
    return list.map((data, i) => {
      return (
        <div className="card mr-2 mb-2" key={i} style={{ width: 18 + 'rem' }}>
          <img src={pic1} className="card-img-top" alt="images" style={{ width: 18 + 'em' }} />
          <div className="card-body">
            <h5 className="card-title">{data.provider['en-ae'].name}</h5>
            <p className="card-text">{data.provider['en-ae'].description}</p>
            <p><span>Type : </span><span>{data.insurance_type}</span></p>
            <p><span>Premium : </span><span>{data.currency} </span><span>{data.premium}</span></p>
            <h6>Covers</h6>
            <select className="form-select" onChange={this.selectChange1.bind(this, i, data)} aria-label="Default select">
              {
                data.covers.map((data1, j) => {
                  return (
                    <option key={j} value={data1.name}>{data1.name}</option>
                  )
                })
              }
            </select>
            {data.text !== undefined ? <p><span>Range : </span><span>{data.text}</span></p> : null}
            {data.cost !== undefined ? <p><span>Cost : </span><span>{data.cost}</span></p> : null}
            <a href={data.provider['en-ae'].terms_conditions_url} className="">Terms and Conditions</a>
          </div>
        </div>
      )
    })
  }
  sort = (sort) => {
    const { MainList } = this.state;
    let Arrlist = [];
    switch (sort) {
      case 'Asc':
        Arrlist = MainList.sort((a, b) => {
          if (a.premium > b.premium) {
            return 1
          }
          else return -1
        })
        break;
      case 'Desc':
        Arrlist = MainList.sort((a, b) => {
          if (a.premium < b.premium) {
            return 1
          }
          else return -1
        })
        break;
      default:
        return 0
    }
    this.setState({ list: Arrlist })
  }
  selectChangeIT = (e) => {
    const { MainList } = this.state;
    let Arrlist = MainList.filter((data2, j) => data2.insurance_type === e.target.value);
    this.setState({ filter: e.target.value, list: Arrlist })
  }
  render() {
    return (
      <div className="container">
        <div className="row pt-2 pb-2 align-items-center">
          <h5 className="mr-2">Filter</h5>
          <div className="col-12-lg">
            <select className="form-select mr-2" onChange={this.selectChangeIT} value={this.state.filter} aria-label="select1" aria-label="Default select">
              <option defaultValue>Filter Insurance Type</option>
              <option value="comprehensive">comprehensive</option>
              <option value="Homeowners">Homeowners</option>
            </select>
          </div>
          <div className="col-12-lg mr-2">
            <span>Sort</span>
            <button type="button" className="btn btn-link" onClick={() => this.sort('Desc')}>High to Low</button>
            <button type="button" className="btn btn-link" onClick={() => this.sort('Asc')}>Low to High</button>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="row justify-content-center">
            <div className="row justify-content-start">
              {this.cardload()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;