import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10
    }
  }

  componentDidMount = () => {
    this.fetchPokemon();
    this.ticker();
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          timer: 10
        })
      })
      .catch((err) => console.log(err))
  }

  ticker = () => {
    let countingTimer = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({
          timer: this.state.timer -1});
        } else if (this.state.time === 0) {
          clearInterval(countingTimer)}
        }, 1000)
      }
  

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.ticker()}}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <br/>
        {this.state.timer}
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} style={this.state.timer === 0 ? {filter: 'brightness(60%)'} : {filter: 'brightness(0%)'}}
            src={this.state.pokeSprite} />
          <h1 className={'pokeName'} style={this.state.timer === 0 ? {opacity: 1} : {opacity: 0}}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;