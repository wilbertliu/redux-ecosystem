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
        list-style: none;
        margin: 5px 0;
        padding: 1.4rem;
        border: 1px solid rgb(211, 211, 211);
      }

      a {
        text-decoration: none;
        color: black;
      }

      li:hover {
        cursor: pointer;
        border: 1px solid lightgrey;
        -webkit-box-shadow: 0 0 5px #cacaca;
        box-shadow: 0px 0px 5px #cacaca;
        -webkit-transition: -webkit-box-shadow 0.5s,
          border-color 0.25s ease-in-out;
        transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
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
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch(`http://localhost:3000`)
  const links = await res.json()

  return { links }
}

export default Index
