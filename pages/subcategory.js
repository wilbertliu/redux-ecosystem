import fetch from "isomorphic-unfetch"

import Layout from "../components/Layout"
import Section from "../components/Section"

const SubCategory = ({ subject }) => (
  <Layout header={subject.categoryName}>
    <Section resource={subject.subcategory} />
  </Layout>
)

SubCategory.getInitialProps = async function(context) {
  const { slug } = context.query

  const res = await fetch(`http://localhost:3000/subcategory.json/${slug}`)

  const subject = await res.json()

  return { subject }
}

export default SubCategory
