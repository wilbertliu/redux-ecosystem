import { Fragment } from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import fetch from "isomorphic-unfetch"

const PostLink = ({ category }) => (
  <Fragment>
    <li>
      <Link as={`/${category.slug}`} href={`/topic?category=${category.slug}`}>
        <a>{category.name}</a>
      </Link>
      {category.subcategories.map(subcategory => (
        <Link
          as={`/${subcategory.slug}`}
          href={`/subcategory?slug=${subcategory.slug}`}
        >
          <a className="sub-topic">{subcategory.name}</a>
        </Link>
      ))}
    </li>
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
  </Fragment>
)

const Index = ({ categories }) => (
  <Layout>
    <div>
      {categories.map(category => (
        <PostLink key={category.name} category={category} />
      ))}
    </div>
    <style jsx>{`
      div {
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
  const categories = await res.json()

  return { categories }
}

export default Index
