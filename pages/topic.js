import fetch from "isomorphic-unfetch"

import Section from "../components/Section"
import Layout from "../components/Layout.js"
import Card from "../components/Card.js"

const Topic = ({ categories }) => (
  <Layout header={categories.name}>
    {categories.subcategories.map(repository => (
      <Section key={repository.name} resource={repository} />
    ))}
  </Layout>
)

Topic.getInitialProps = async function(context) {
  const { category } = context.query
  const res = await fetch(`http://localhost:3000/category.json/${category}`)

  const categories = await res.json()

  return { categories }
}

export default Topic
