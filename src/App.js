import React, { Component } from 'react';

import useForward from './env'
//import {connect} from "react-redux";

//import {fillPairs, updatePair} from "./pairActions";

import { Pair as SimplePair, ForwardPair, mapState as pairMapState } from "./Pair";

const Pair = useForward ? ForwardPair : SimplePair

export function mapState(state) {
    const partition = Math.floor(state.length / 3)

    return {
        groups: [
            state.slice(0, partition),
            state.slice(partition, partition * 2),
            state.slice(partition * 2)
        ]
    }
}

//const actions = {fillPairs, updatePair};

export class App extends Component {
    componentDidMount =  () => {
        this.props.fillPairs()
        this.simulate()
    }

    simulate = () => {
        setInterval(this.props.updatePair, 13)

        setInterval(this.props.updatePair, 21)

        setInterval(this.props.updatePair, 34)

        setInterval(this.props.updatePair, 55)
    }

    render () {
        return (
            <div className='row'>
                {this.props.groups.map((group, idx) => {
                    return (
                        <div className='col-lg-4' key={idx}>
                            <ul className='list-group'>
                                {group.map((pair) => {
                                    return (
                                        <Pair key={pair.id} id={pair.id} {...pairMapState(this.props.state, { id: pair.id })} />
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export const ForwardApp = React.forwardRef((props, ref) => <App {...props} />)

//export default connect(mapState, actions)(App);
