import Link from "next/link"
import fetch from "isomorphic-unfetch"
import Layout from "../components/Layout.js"
import Card from "../components/Card.js"

const formatDescr = str => {
  if (str.length > 150) {
    return str.substr(0, 130).concat("...")
  } else {
    return str
  }
}

const sortByNPM = (a, b) => {
  return b["npm_download_since_last_month"] - a["npm_download_since_last_month"]
}

const sortByGithub = (a, b) => {
  return b["github_star"] - a["github_star"]
}

const sortByDefault = (a, b) => {
  const aNPM = a.npm_download_since_last_month
    ? a.npm_download_since_last_month
    : 0
  const bNPM = b.npm_download_since_last_month
    ? b.npm_download_since_last_month
    : 0

  if (bNPM > aNPM) {
    return 1
  } else if (bNPM < aNPM) {
    return -1
  }

  if (!aNPM || !bNPM) {
    return b.github_star - a.github_star
  }

  return -1
}

const Section = ({ resource }) => {
  return (
    <span id={resource.name}>
      <a className="topic-header" href={`#${resource.name}`}>
        {resource.name}
      </a>
      <div className="grid">
        {resource.repositories
          .sort(sortByDefault)
          .map(repo => <Card key={repo.description} repo={repo} />)}
      </div>
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
  <Layout
    // subTopics={subjects.subcategories.map(subcategory => subcategory.repositiories)}
    header={subjects.name}
  >
    <List subjects={subjects} />
  </Layout>
)

Topic.getInitialProps = async function(context) {
  const { name } = context.query

  const res = await fetch(`http://localhost:3000/name.json/${name}`)
  const subjects = await res.json()

  return { subjects }
}

export default Topic
