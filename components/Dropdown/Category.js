import React, { Component } from "react"
import SubCategory from "./SubCategory"
import FaArrowDown from "react-icons/lib/fa/arrow-down"

class Category extends Component {
  constructor() {
    super()
    this.state = { open: false }
  }

  render() {
    const { category } = this.props
    const { open } = this.state

    return (
      <React.Fragment>
        <li
          onClick={() =>
            this.setState({
              open: !open
            })
          }
        >
          {category.subject.toLowerCase()} ({category.subtopics.length})
        </li>
        {open
          ? category.subtopics.map(topic => <SubCategory topic={topic} />)
          : null}
        <style jsx>{`
          li {
            font-size: 0.8rem;
            cursor: pointer;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
export default Category
