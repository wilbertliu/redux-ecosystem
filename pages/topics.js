import Layout from "../components/Layout.js"
import Link from "next/link"
import fetch from "isomorphic-unfetch"
import Card from "../components/Card.js"

const formatString = str => {
  return str
    .split("-")
    .join(" ")
    .toUpperCase()
}

const formatDescr = str => {
  if (str.length > 120) {
    return str.substr(0, 100).concat("...")
  } else {
    return str
  }
}

const List = ({ subjects }) => (
  <div>
    {subjects.content.map(resource =>
      resource.resources.map(link => <Card link={link} />)
    )}
    <style jsx>{`
      div {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
        grid-auto-rows: 250px;
        grid-column-gap: 20px;
        grid-row-gap: 0.6em;
      }
    `}</style>
  </div>
)

const Topics = ({ subjects }) => (
  <Layout header={formatString(subjects.subject)}>
    <List subjects={subjects} />
  </Layout>
)

Topics.getInitialProps = async function(context) {
  const { contents } = context.query
  const res = await fetch(`http://localhost:3000/${contents}`)
  const subjects = await res.json()

  return { subjects }
}

export default Topics
