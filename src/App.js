import React, {Component} from 'react';
import './App.css';
import {apiKey,apiKeyAdditionalOne,apiKeyAdditionalTwo,weatherLink} from './Components/Constants'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalApi:apiKey,
      inputValue: "coimbatore",
      windSpeed: "",
      cityTemp: "",
      city: "",
      country: "",
      humidity: "",
      pressure: "",
      condition: "",
    };
  };
  componentDidMount() {
    this._getData();
  };
  search = (e)  => {
    if(e.key === "Enter"){
      this._getData();
    };
  };
  _getData = () => {
    let completeApiLink = `${weatherLink}${this.state.inputValue}&appid=${apiKey}`;
      fetch(completeApiLink)
      .then((res) =>{
        if(!res.ok){
          let completeApiLink = `${weatherLink}${this.state.inputValue}&appid=${apiKeyAdditionalOne}`;
          this.setState({finalApi:apiKeyAdditionalOne});
          fetch(completeApiLink)
          .then((resu)=>{
            if(!resu.ok){
              this.setState({finalApi:apiKeyAdditionalTwo});
              this._getApi();
            }
            else if(resu.ok){
              this._getApi();
            }})
          //optional
          // .catch((err) =>{
          //   console.log(err);
          //
          // })
        }
        else if(res.ok){
          this._getApi();
        };
      })
      //optional
      // .catch((err)=>{
      //   console.log('catch');
      //   console.log(err.message);
      //   console.log(this.state.finalApi);
      //
      // })
    };
    _getApi = () =>{
      let finalLink = `${weatherLink}${this.state.inputValue}&appid=${this.state.finalApi}`;
     fetch(finalLink)
     .then((response) => {
             if(response.status === 200){
                 return response.json();
             }
             else if(response.status === 408){
                 alert("Server down :( try after some time");
             }
             else if(response.status === 404){
               alert("Location Not Found will be updated soon..... or check spelling");
             };
         })
       .then((data) => {
         if(typeof(data) != "undefined"){
         this.setState({cityTemp: data.main.temp});
         this.setState({humidity: data.main.humidity});
         this.setState({condition: data.weather[0].main});
         this.setState({pressure: data.main.pressure});
         this.setState({windSpeed: data.wind.speed});
         this.setState({country: data.sys.country});
         this.setState({city: data.name});};

       })
    };
  render() {
    return (
      <div className = "App">
        <div className = "Main">
          <div className = "searchbox">
            <input type = "text"
                   onChange={e =>{this.setState({inputValue: e.target.value})}}
                   value={(this.state.inputValue).toUpperCase()}
                   onKeyPress={this.search}
                   placeholder = "search"
                   className = "search">
            </input>
          </div>
          <div className = "Box" >
            <div className = "city" >
              <h1 >{(this.state.city).toUpperCase()}, {this.state.country} < /h1>
              </div>
            <div className = "temperature" >
              <h3> Temperature {(this.state.cityTemp - 273.15).toFixed(2)}&#176;C |
              {(this.state.cityTemp * 1.8 - 459.67).toFixed(2)}&#176;F |
              {(this.state.cityTemp)} K</h3>
            </div >
            <div className = "windspeed">
              <h3> windSpeed {this.state.windSpeed} MPH </h3>
            </div>
            <div className = "humidity">
              <h3> Humidity {this.state.humidity} | Pressure {this.state.pressure } Pa </h3>
            </div>
            <div className = "condition">
              <h3> Condition {this.state.condition} </h3>
            </div>
          </div>
      </div>
    </div>
    )
  }
};
export default App;
