import React from "react";
import cutStringBeforeFirstSpace from "../../../modules/cutStringBeforeFirstSpace";
import './CustomSelect.scss';
import SelectArrow from "../../../pictures/icons/select-arrow.svg";

class CustomSelect extends React.Component {
    constructor(props) {
        super(props);

        // @selectedValue => Show default text in select
        // @showOptionList => Show / Hide List options
        // @optionsList => List of options
        this.state = {
            selectedValue: "",
            showOptionList: false,
            optionsList: []
        };
    }

    componentDidMount() {
        // Add Event Listner to handle the click that happens outside
        // the Custom Select Container
        document.addEventListener("mousedown", this.handleClickOutside);
        this.setState({
            selectedValue: this.props.defaultText
        });
    }

    componentWillUnmount() {
        // Remove the event listner on component unmounting
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    // This method handles the click that happens outside the
    // select text and list area
    handleClickOutside = e => {
        if (
            !e.target.classList.contains("custom-select-option") &&
            !e.target.classList.contains("selected-text")
        ) {
            this.setState({
                showOptionList: false
            });
        }
    };

    // This method handles the display of option list
    handleListDisplay = () => {
        this.setState(prevState => {
            return {
                showOptionList: !prevState.showOptionList
            };
        });
    };

    // This method handles the setting of name in select text area
    // and list display on selection
    handleOptionClick = (e, option) => {
        this.setState({
            selectedValue: e.target.getAttribute("data-name"),
            showOptionList: false
        });
        this.props.onChangeCurrency(option.label, option.symbol);
    };

    render() {
        const { optionsList } = this.props;
        const { showOptionList, selectedValue } = this.state;
        return (
            <div className="custom-select-container">
                <div
                    className={showOptionList ? "selected-text active" : "selected-text"}
                    onClick={this.handleListDisplay}
                >
                    {cutStringBeforeFirstSpace(selectedValue)}
                    <img className={`select__arrow ${showOptionList ? 'select__arrow--active' : null}`} src={SelectArrow} alt="select-arrow" />
                </div>
                {showOptionList && (
                    <ul className="select-options">
                        {optionsList.map(option => {
                            return (
                                <li
                                    className="custom-select-option"
                                    data-name={option.symbol}
                                    key={option.label}
                                    onClick={(event) => this.handleOptionClick(event, option)}
                                >
                                    {option.symbol} {option.label}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    }
}

export default CustomSelect;