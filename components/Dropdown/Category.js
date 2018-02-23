import React, { Component, Fragment } from "react"
import Link from "next/link"
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
          {category.name}
        </li>
        {open ? (
          <Fragment>
            <Link href={`/${category.name}`}>
              <a>All</a>
            </Link>
            {category.subcategories.map(subcategory => (
              <SubCategory category={category.name} subcategory={subcategory} />
            ))}
          </Fragment>
        ) : null}
        <style jsx>{`
          li {
            font-size: 0.8rem;
            cursor: pointer;
          }

          a {
            text-decoration: none;
            color: var(--redux);
            font-size: 0.8rem;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
export default Category
