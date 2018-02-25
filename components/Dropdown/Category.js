import React, { Component, Fragment } from "react"
import Link from "next/link"
import Router from "next/router"
import SubCategoryItem from "./SubCategoryItem"
import FaArrowDown from "react-icons/lib/fa/arrow-down"

class Category extends Component {
  constructor() {
    super()
    this.state = { open: false }
  }

  checkIfActive = () => {
    const { category } = Router.query

    if (category == this.props.category.name) {
      this.setState({ open: true })
    }
  }

  componentDidMount() {
    this.props.category.name
      ? this.checkIfActive()
      : this.setState({ open: false })
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
          <div>
            <Link
              as={`/${category.name}`}
              href={`/topic?category=${category.name}`}
            >
              <a>All</a>
            </Link>
            {category.subcategories.map(subcategory => (
              <SubCategoryItem
                key={category.name}
                category={category.name}
                subcategory={subcategory}
              />
            ))}
          </div>
        ) : null}
        <style jsx>{`
          li {
            font-size: 0.8rem;
            padding: 2px 0;
            cursor: pointer;
          }

          a {
            margin-left: 1.4rem;
            text-decoration: none;
            color: var(--redux);
            font-size: 0.7rem;
          }

          div {
            margin-top: 0px;
            -webkit-animation-name: list-enter;
            -webkit-animation-duration: 0.2s;
            animation-name: list-enter;
            animation-duration: 0.2s;
          }

          @-webkit-keyframes list-enter {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 0;
            }
          }

          @keyframes list-enter {
            0% {
              height: 0;
              visibility: hidden;
            }
            25% {
              height: 1.5rem;
              visibility: hidden;
            }
            50% {
              height: 2.5rem;
              visibility: hidden;
            }
            75% {
              height: 3.5rem;
              visibility: hidden;
            }
            100% {
              opacity: 0.7;
            }
          }
        `}</style>
      </Fragment>
    )
  }
}
export default Category
