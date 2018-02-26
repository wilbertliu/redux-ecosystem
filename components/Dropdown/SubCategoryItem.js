import React from "react"
import Link from "next/link"

const SubCategoryItem = ({ category, subcategory }) => (
  <li>
    <Link
      as={`/${category}/${subcategory.name}`}
      href={`/subcategory?category=${category}&subcategory=${subcategory.name}`}
    >
      <a>
        {subcategory.name} ({subcategory.repositories.length})
      </a>
    </Link>

    <style jsx>{`
      li {
        display: flex;
        flex-direction: column;
        padding: 2px 0;
      }

      a {
        margin-left: 1.4rem;
        text-decoration: none;
        color: var(--redux);
        font-size: 0.8rem;
      }
    `}</style>
  </li>
)
export default SubCategoryItem
