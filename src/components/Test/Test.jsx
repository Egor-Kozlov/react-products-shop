import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { setCurrency } from '../../store/slices/currency'
import { setCurrency } from '../../store/slices/currency'

export class Test extends Component {

    componentDidMount() {
        console.log(this.props)
    }

    setCurrencyOnStore = () => {
        this.props.setCurrency({ currency: '123' })
        console.log(this.props)
    }

    render() {
        return (
            <div>
                Test
                <button onClick={() => this.setCurrencyOnStore()}>test</button>
            </div>
        )
    }
}

//get initial state from reducer
function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}


export default connect(mapDispatchToProps, { setCurrency })(Test)