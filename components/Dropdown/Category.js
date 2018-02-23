import React, { Component, Fragment } from "react"
import Link from "next/link"
import SubCategoryItem from "./SubCategoryItem"
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
      <Fragment>
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
            <Link
              as={`/${category.name}`}
              href={`/topic?name=${category.name}`}
            >
              <a>All</a>
            </Link>
            {category.subcategories.map(subcategory => (
              <SubCategoryItem
                category={category.name}
                subcategory={subcategory}
              />
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
      </Fragment>
    )
  }
}
export default Category
