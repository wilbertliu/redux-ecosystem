import Link from "next/link"
import fetch from "isomorphic-unfetch"
import Layout from "../components/Layout.js"
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

const Section = ({ resource }) => {
  return (
    <span id={resource.topic}>
      <a className="topic-header" href={`#${resource.topic}`}>
        {resource.topic}
      </a>
      <div className="grid">
        {resource.resources.map(link => <Card key={link.link} link={link} />)}
      </div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
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
    {subjects.content.map(resource => (
      <Section key={resource.topic} resource={resource} />
    ))}
  </div>
)

const Topics = ({ subjects }) => (
  <Layout
    subTopics={subjects.content.map(resource => resource.topic)}
    header={formatString(subjects.subject)}
  >
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
