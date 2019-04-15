import React, { Component } from "react";

class Settings extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const { handleSettingsChange } = this.props;
    const {
      boardSize,
      playersColors,
      itemColor,
      emptyCellColor,
      itemsToCollectCount
    } = this.state;

    return (
      <div className="settings">
        <form>
          <label htmlFor="boardSize">Board Size: {boardSize}</label>
          <input
            type="range"
            name="boardSize"
            value={boardSize}
            onChange={this.handleChange}
            className="custom-range"
            min={4}
            max={40}
            id="boardSize"
          />
          <label htmlFor="itemsToCollectCount">Number of items: </label>
          <select
            onChange={this.handleChange}
            value={itemsToCollectCount}
            name="itemsToCollectCount"
            id="itemsToCollectCount"
            className="form-control"
          >
            <option key="1" value={1}>
              Very small
            </option>
            <option key="2" value={2}>
              Small
            </option>
            <option key="3" value={3}>
              Medium
            </option>
            <option key="4" value={4}>
              Big
            </option>
            <option key="5" value={5}>
              Very big
            </option>
          </select>
          <button
            type="button"
            onClick={() => handleSettingsChange(this.state)}
            className="btn btn-primary"
          >
            Save Changes
          </button>
        </form>
      </div>
    );
  }
}
export default Settings;
