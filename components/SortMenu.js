import React from "react"
import Link from "next/link"

import database from "../database.json"
import FaArrowUp from "react-icons/lib/fa/arrow-up"
import FaArrowDown from "react-icons/lib/fa/arrow-down"
import FaStar from "react-icons/lib/fa/star"
import FaDownload from "react-icons/lib/fa/download"
import Dropdown from "./Dropdown/Dropdown"

const SortMenu = () => (
  <div className="sortNav">
    <Dropdown categories={database.categories.map(x => x)} />
    <ul>
      <div className="header">Sort By</div>
      <li>
        <label>
          <input checked type="checkbox" />
          NPM
        </label>
        <div className="icon">
          <FaDownload />
        </div>
      </li>
      <li>
        <label>
          <input checked type="checkbox" />
          GitHub
        </label>
        <div className="icon">
          <FaStar />
        </div>
      </li>
    </ul>
    <style jsx>{`
      .sortNav {
        grid-row: 2;
        grid-column: col-start / span 2;
        font-size: 1rem;
        font-weight: 300;
        top: 25px;
        position: -webkit-sticky;
        position: sticky;
        box-sizing: border-box;
        height: 80vh;

        display: flex;
        flex-direction: column;
      }

      input[type="checkbox"] {
        border: solid;
        border-radius: 4px;
        border-color: var(--redux);

        width: 15px;
        height: 15px;
      }

      li {
        padding: 5px 0px;
        display: flex;
        align-items: flex-start;
        margin: 3px 0;
      }

      .icon {
        margin-left: auto;
      }

      ul {
        margin: 0;
        margin-top: auto;
        padding: 15px;
        width: 80%;
      }
    `}</style>
  </div>
)

export default SortMenu
