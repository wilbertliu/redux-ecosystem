import Link from "next/link"
import fetch from "isomorphic-unfetch"
import Layout from "../components/Layout.js"
import Card from "../components/Card.js"
import { sortByDefault } from "../components/Utils/utils"

const Section = ({ subcategory }) => {
  const sortedList = subcategory.repositories.map(repo => (
    <Card key={repo.description} repo={repo} />
  ))
  return (
    <span id={subcategory.name}>
      <div className="topic-header">{subcategory.name}</div>
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

const SubCategory = ({ subjects, name }) => (
  <Layout header={name}>
    <Section subcategory={subjects} />
  </Layout>
)

SubCategory.getInitialProps = async function(context) {
  const { name, subcategory } = context.query

  const res = await fetch(
    `http://localhost:3000/subcategory.json/${name}/${subcategory}`
  )

  const subjects = await res.json()

  return { subjects, name }
}

export default SubCategory
