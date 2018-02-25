import fetch from "isomorphic-unfetch"

import Layout from "../components/Layout"
import Section from "../components/Section"

const SubCategory = ({ subjects, category }) => (
  <Layout header={category}>
    <Section resource={subjects} />
  </Layout>
)

SubCategory.getInitialProps = async function(context) {
  const { category, subcategory } = context.query

  const res = await fetch(
    `http://localhost:3000/subcategory.json/${category}/${subcategory}`
  )

  const subjects = await res.json()

  return { subjects, category }
}

export default SubCategory
