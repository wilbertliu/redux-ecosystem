import Link from "next/link"

const MainNav = () => (
  <div>
    <Link href="/">
      <a id="logo">
        <h2>Redux Ecosystem Links</h2>
      </a>
    </Link>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
    <style jsx>{`
      a {
        text-decoration: none;
        margin-left: 15px;
        color: #f3f7f9;
        display: inline;
      }

      a:not(#logo):hover {
        opacity: 0.6;
      }

      div {
        padding: 15px;
        z-index: 5;
        position: relative;
        box-shadow: 0 1px 0 #4d4d4d inset, 0 2px 3px rgba(0, 0, 0, 0.25);
        background: #343a40;
      }

      h2 {
        color: #eee;
        display: inline;
      }
    `}</style>
  </div>
)

export default MainNav
