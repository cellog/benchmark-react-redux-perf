import React, { Component } from 'react'

import { App, mapState } from './App'
import {fillPairs, updatePair} from "./pairActions";
import reducer from './pairsReducer'

export class Provider extends Component {
  state = {
    pairs: []
  }

  update(action) {
    this.setState(state => {
      const pairs = reducer(state.pairs, action)
      if (pairs === state.pairs) return null
      return { pairs }
    })
  }

  render() {
    return (
      <App
        {...mapState(this.state.pairs)}
        fillPairs={() => this.update(fillPairs())}
        updatePair={() => this.update(updatePair())}
        state={this.state.pairs}
      />
    )
  }
}

export default Provider
