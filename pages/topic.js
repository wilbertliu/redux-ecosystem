import Link from "next/link"
import fetch from "isomorphic-unfetch"
import Layout from "../components/Layout.js"
import Card from "../components/Card.js"
import { sortByDefault } from "../components/Utils/utils"

const Section = ({ resource }) => {
  const sortedList = resource.repositories
    .sort(sortByDefault)
    .map(repo => <Card key={repo.description} repo={repo} />)
  return (
    <span id={resource.name}>
      <a className="topic-header" href={`#${resource.name}`}>
        {resource.name}
      </a>
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
          padding: 10px 0;
          color: var(--redux);
        }
      `}</style>
    </span>
  )
}

const List = ({ subjects }) => (
  <div>
    {subjects.subcategories.map(repository => (
      <Section key={repository.name} resource={repository} />
    ))}
  </div>
)

const Topic = ({ subjects }) => (
  <Layout header={subjects.name}>
    <List subjects={subjects} />
  </Layout>
)

Topic.getInitialProps = async function(context) {
  const { name, subcategory } = context.query
  const res = await fetch(`http://localhost:3000/category.json/${name}`)

  const subjects = await res.json()

  return { subjects }
}

export default Topic
