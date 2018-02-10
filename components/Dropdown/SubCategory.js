import React from "react"
import Link from "next/link"

const SubCategory = ({ topic }) => (
  <li>
    <Link>
      <a href={topic.label}>{topic.label}</a>
    </Link>
    <style jsx>{`
      li {
        display: flex;
        flex-direction: column;
      }

      a {
        text-decoration: none;
        color: var(--redux);
        font-size: 0.8rem;
      }
    `}</style>
  </li>
)
export default SubCategory
