import React from "react"
import Link from "next/link"

import FaArrowUp from "react-icons/lib/fa/arrow-up"
import FaArrowDown from "react-icons/lib/fa/arrow-down"
import FaStar from "react-icons/lib/fa/star"
import FaDownload from "react-icons/lib/fa/download"

const SortMenu = () => (
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
    <style jsx>{`
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
  </ul>
)

export default SortMenu
