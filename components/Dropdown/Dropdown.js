import React, { Component, Fragment } from "react"
import Category from "./Category"

const Dropdown = ({ categories }) => {
  return (
    <Fragment>
      <ul>
        <li> Categories: </li>
        {categories.map(category => <Category category={category} />)}
        <style jsx>{`
          ul {
            align-self: flex-start;
            padding: 0;
            margin: 10px auto;

            overflow: scroll;
          }

          li {
            margin-bottom: 3px;
            font-weight: 400;
          }
        `}</style>
      </ul>
    </Fragment>
  )
}

export default Dropdown
