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
  const aNPM = a.npm_download_since_last_month
    ? a.npm_download_since_last_month
    : 0
  const bNPM = b.npm_download_since_last_month
    ? b.npm_download_since_last_month
    : 0

  return bNPM - aNPM
}

const sortByGithub = (a, b) => {
  return b["github_star"] - a["github_star"]
}

const sortByDefault = (a, b) => {
  const aSortValue =
    a.npm_download_since_last_month > a.github_star
      ? a.npm_download_since_last_month
      : a.github_star || 0

  const bSortValue =
    b.npm_download_since_last_month > b.github_star
      ? b.npm_download_since_last_month
      : b.github_star || 0

  if (bSortValue > aSortValue) {
    return 1
  } else if (bSortValue < aSortValue) {
    return -1
  }

  return 0
}

const Section = ({ subcategory }) => {
  const sortedList = subcategory.repositories.map(repo => (
    <Card key={repo.description} repo={repo} />
  ))
  return (
    <span id={subcategory.name}>
      <a className="topic-header" href={`#${subcategory.name}`}>
        {subcategory.name}
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

const List = ({ subcategory }) => (
  <div>
    {subcategory.repositories.map(repository => (
      <Section key={repository.name} repository={repository} />
    ))}
  </div>
)

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
