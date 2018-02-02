import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const CategoryLink = ({ subject }) => (
  <li>
    <Link as={`/p/${subject.subject}`} href={`/post?title=${subject.subject}&contents=${subject.contents}`}>
      <a>{subject.subject.split("-").join(" ")}</a>
    </Link>
    <style jsx>{`
        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
            opacity: 0.6;
        }
      `}</style>
  </li >
)

const CategoriesList = ({ links }) => (
  <Layout>
    <ul>
      {links.subjects.map((subject) => (
        <CategoryLink key={subject.contents} subject={subject} />
      ))}
    </ul>
    <style jsx>{`
        ul {
          padding: 0;
          list-style: none;
        }
  
        li {
          margin: 5px 0;
        }
  
        a {
          text-decoration: none;
          color: black;
        }
  
        a:hover {
          opacity: 0.6;
        }
      `}</style>
  </Layout >
)

export default CategoriesList