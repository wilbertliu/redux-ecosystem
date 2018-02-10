import React from "react"
import Link from "next/link"

import FaArrowUp from "react-icons/lib/fa/arrow-up"
import FaArrowDown from "react-icons/lib/fa/arrow-down"
import FaStar from "react-icons/lib/fa/star"
import FaDownload from "react-icons/lib/fa/download"
import Dropdown from "./Dropdown/Dropdown"

// Mock List for Menu
const categoryList = [
  {
    subject: "ACTION REDUCER GENERATORS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "ACTIONS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "APPS AND EXAMPLES",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "COMPONENT DATA FETCHING PRELOADING",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "COMPONENT STATE",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "DEVTOOLS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "ENTITY COLLECTION MANAGEMENT",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "FORMS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "IMMUTABLE DATA",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "LIBRARY INTEGRATION",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "MIDDLEWARE ASYNC",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "MIDDLEWARE NETWORK REQUESTS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "MIDDLEWARE SOCKETS ADAPTERS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "MIDDLEWARE",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "OTHER RESOURCES",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "PROJECT SCAFFOLDING",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "REDUCERS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "ROUTING",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "SIDE EFFECTS FUNCTIONS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "SIDE EFFECTS GENERATORS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "SIDE EFFECTS OBSERVABLES",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "SIDE EFFECTS OTHER",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "SIDE EFFECTS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "STORE PERSISTENCE",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "STORE",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "TESTING",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "USE CASES",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "UTILITIES",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "VARIATIONS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  },
  {
    subject: "WIDGETS",
    subtopics: [
      { label: "SubCategory" },
      { label: "SubCategory 2" },
      { label: "Option 3" }
    ]
  }
]

const SortMenu = ({ topics }) => (
  <div className="sortNav">
    <Dropdown categories={categoryList} />
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
        list-style: none;
        margin: 0;
        margin-top: auto;
        padding: 15px;
        width: 80%;
      }
    `}</style>
  </div>
)

export default SortMenu
