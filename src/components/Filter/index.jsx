import { Component } from "react";
import PropTypes from "prop-types";
import { nanoid } from 'nanoid'
import scss from "./Filter.module.scss"

export default class Filter extends Component {
    render() {
        const searchId = nanoid();
        return (
            <div className={scss.containerFilter}>
                <label htmlFor={searchId}>Find contact</label>
                <input
                    type="text"
                    id={searchId}
                    name="filter"
                    value={this.props.filter}
                    onChange={this.props.onFilterChange}
                />
            </div>
        );
    }
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};