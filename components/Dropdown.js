import React, { Component } from "react"

class Dropdown extends Component {
  state = {
    value: "",
    selected: false
  }

  handleUpdate = e => {
    const url = e.target.value
    const selected = url ? true : false

    this.setState({ value: url, selected: selected })
  }

  render() {
    const { selected, visible } = this.state
    const { options, topicOptions } = this.props

    const RenderOptions = options.map(option => (
      <option
        key={option.value}
        url={option.url}
        value={`/${option.value}/${option.url}`}
      >
        {option.label}
      </option>
    ))

    const RenderSubTopicOptions = topicOptions.map(option => (
      <option
        key={option.value}
        url={option.url}
        value={`/${option.value}/${option.url}`}
      >
        {option.label}
      </option>
    ))

    return (
      <React.Fragment>
        <select
          onChange={this.handleUpdate}
          defaultValue="all"
          id="categoryDropdown"
          className="form-control"
        >
          <option value="all" disabled hidden>
            All Categories
          </option>
          {RenderOptions}
        </select>
        {this.state.selected ? (
          <select
            defaultValue="all"
            id="subCategoryDropdown"
            className="form-control"
          >
            <option value="Sub Topics" disabled hidden>
              All Topics
            </option>
            {RenderSubTopicOptions}
          </select>
        ) : null}
        <style jsx>{`
          select {
            width: 90%;
            margin: 0 auto;
            margin-top: 10%;
            background-color: #fff;
            height: 2rem;
            color: #0a0a0a;
            border: 1px solid #cacaca;
            box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
            font-size: 0.8rem;
            transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
          }

          select:focus {
            border: 1px solid #8a8a8a;
            background-color: #fefefe;
            outline: none;
            -webkit-box-shadow: 0 0 5px #cacaca;
            box-shadow: 0 0 5px #cacaca;
            -webkit-transition: -webkit-box-shadow 0.5s,
              border-color 0.25s ease-in-out;
            transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default Dropdown
