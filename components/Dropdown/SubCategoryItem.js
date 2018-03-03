import React from "react"
import Link from "next/link"

const SubCategoryItem = ({ category, subcategory, repoCount }) => (
  <li>
    <Link
      as={`/${subcategory.slug}`}
      href={`/subcategory?slug=${subcategory.slug}`}
    >
      <a>
        {subcategory.name} ({repoCount})
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
