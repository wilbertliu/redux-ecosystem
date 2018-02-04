import React from "react"
import Link from "next/link"

import FaArrowUp from "react-icons/lib/fa/arrow-up"
import FaArrowDown from "react-icons/lib/fa/arrow-down"
import FaStar from "react-icons/lib/fa/star"
import FaDownload from "react-icons/lib/fa/download"

const FilterMenu = () => (
  <div className="filterNav">
    <ul>
      <div className="header">Sort:</div>
      <li>
        <label>
          <input type="checkbox" />
          npm <FaDownload />
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          Github <FaStar />
        </label>
      </li>
    </ul>
    <style jsx>{`
      li {
        padding: 10px 0;
      }

      .filterNav {
        grid-row: 2;
        grid-column: col-start / span 2;
        margin: 0 auto;
        font-size: 1.2rem;
        font-weight: 300;
        top: 25px;
        position: -webkit-sticky;
        position: sticky;
        box-sizing: border-box;
        height: 100vh;
      }

      input[type="checkbox"] {
        padding: 1.5rem;
        margin-right: 5px;
      }

      ul {
        list-style: none;
        margin: 0;
      }
    `}</style>
  </div>
)

export default FilterMenu
