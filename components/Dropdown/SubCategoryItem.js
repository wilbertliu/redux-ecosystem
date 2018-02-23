import React from "react"
import Link from "next/link"

const SubCategoryItem = ({ category, subcategory }) => (
  <li>
    <Link
      as={`/${category}/${subcategory.name}`}
      href={`/subcategory?name=${category}&subcategory=${subcategory.name}`}
    >
      <a>
        {subcategory.name} ({subcategory.repositories.length})
      </a>
    </Link>

    <style jsx>{`
      li {
        list-style-type: disk;
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
export default SubCategoryItem
