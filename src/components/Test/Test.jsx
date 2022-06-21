import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { setCurrency } from '../../store/slices/currency'
import { setCurrency } from '../../store/slices/currency'

export class Test extends Component {

    componentDidMount() {
        // console.log(this.props)
    }

    setCurrencyOnStore = () => {
        // this.props.setCurrency(
        //     {
        //         label: "123",
        //         symbol: "312"
        //     })
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
// function mapDispatchToProps(dispatch) {
//     return {
//         dispatch
//     }
// }

const mapStateToProps = (state) => {
    return {
        currency: state.currencyReducer
    }
}
// const mapDispatchToProps = { setCurrency };

export default connect(mapStateToProps, { setCurrency })(Test)