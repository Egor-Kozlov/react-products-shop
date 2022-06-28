import React, { Component } from 'react'
import './InfiniteSlider.scss'
import ArrowIcon from './icons/arrow-icon.svg'
// import slide from './slide';

var hasOwn = {}.hasOwnProperty;

const classNames = (...args) => {
    var classes = [];

    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (!arg) continue;

        var argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg) && arg.length) {
            var inner = classNames.apply(null, arg);
            if (inner) {
                classes.push(inner);
            }
        } else if (argType === 'object') {
            for (var key in arg) {
                if (Object.hasOwnProperty.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}

class InfiniteSlider extends React.Component {
    constructor() {
        super();

        this.state = {
            currentIndex: 0,
            isTransitioning: false,
            goingLeft: false
        };
    }

    componentDidMount() {
        // console.log(this.props.pictures);
        window.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
    }

    onKeyUp = (e) => {
        if (e.keyCode) {
            if (e.keyCode === 39) {
                this.showNextSet();
            } else if (e.keyCode === 37) {
                this.showPrevSet();
            }
        }
    }

    render() {
        // const { images } = this.props.images;
        const { currentIndex, isTransitioning, goingLeft } = this.state;
        // console.log(images);

        return (
            <div className="carousel__wrapper">
                <div className="carousel__container">
                    {this.props.pictures.map((img, index) => {
                        let className = 'carousel__image'
                        if (index === currentIndex) className += ' active';

                        return <img src={img} className={className} key={`img-${index}`} />;
                    })}
                </div>
                <div className="carousel__controls">
                    <div className="carousel__button" onClick={this.showPrevSet}>
                        <img src={ArrowIcon} className="fa fa-arrow-left"></img>
                    </div>
                    <div className="carousel__button" onClick={this.showNextSet}>
                        <img src={ArrowIcon} className="fa fa-arrow-right"></img>
                    </div>
                </div>
            </div>
        );
    }

    showPrevSet = () => {
        const currentIndex = (this.state.currentIndex - 1 + this.props.pictures.length) % this.props.pictures.length;
        this.setState({ currentIndex });
    }

    showNextSet = () => {
        const currentIndex = (this.state.currentIndex + 1) % this.props.pictures.length;
        this.setState({ currentIndex });
    }
}


export default InfiniteSlider