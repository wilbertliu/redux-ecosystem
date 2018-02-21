import Layout from "../components/Layout"
import Link from "next/link"
import fetch from "isomorphic-unfetch"

const formatString = str => {
  return str.replace(/[\s+//]/g, "")
}

const PostLink = ({ category }) => (
  <div>
    <Link as={`/${category}`} href={`/topic?name=${category}`}>
      <li>
        <a>{category}</a>
      </li>
    </Link>
    <style jsx>{`
      li {
        margin: 5px 0;
        cursor: pointer;
        padding: 1.4rem;
        background: #fff;
        box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
        transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
      }

      .sub-topic {
        margin: 0 10px;
        color: var(--redux);
        font-size: 0.9rem;
        font-style: italic;
      }

      li:hover {
        -webkit-box-shadow: 0 0 5px #cacaca;
        box-shadow: 0px 2px 4px #cacaca;
        -webkit-transition: -webkit-box-shadow 0.5s,
          border-color 0.25s ease-in-out;
        transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
      }

      a {
        text-decoration: none;
        color: black;
      }
    `}</style>
  </div>
)

const Index = ({ topics }) => (
  <Layout>
    <ul>{topics.map(category => <PostLink category={category} />)}</ul>
    <style jsx>{`
      ul {
        padding: 0;
        list-style: none;
      }

      a {
        text-decoration: none;
        color: black;
      }
    `}</style>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch(`http://localhost:3000/topics.json`)
  const topics = await res.json()
  return { topics }
}

export default Index
