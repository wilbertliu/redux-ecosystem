import Layout from "../components/Layout"
import Link from "next/link"
import fetch from "isomorphic-unfetch"

const PostLink = ({ subject }) => (
  <div>
    <Link
      as={`/${subject.subject}/${subject.contents}`}
      href={`/topics?title=${subject.subject}&contents=${subject.contents}`}
    >
      <li>
        <a>{subject.subject.split("-").join(" ")}</a>
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

const Index = ({ links }) => (
  <Layout>
    <ul>
      {links.subjects.map(subject => (
        <PostLink key={subject.contents} subject={subject} />
      ))}
    </ul>
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
  const res = await fetch(`http://localhost:3000`)
  const links = await res.json()

  return { links }
}

export default Index
