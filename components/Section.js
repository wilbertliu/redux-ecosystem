import React from "react"

import { sortByDefault } from "./Utils/utils"
import Card from "./Card"

const Section = ({ resource }) => {
  const sortedList = resource.repositories
    .sort(sortByDefault)
    .map(repo => <Card key={repo.name} repo={repo} />)
  return (
    <span id={resource.name}>
      <div className="topic-header">{resource.name}</div>
      <div className="grid">{sortedList}</div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-auto-rows: 250px;
          grid-column-gap: 15px;
          grid-row-gap: 15px;
          margin: 20px 0;
        }

        .topic-header {
          color: black;
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-decoration: none;
          padding: 5px 0;
          color: var(--redux);
        }
      `}</style>
    </span>
  )
}

export default Section
