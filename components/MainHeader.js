import FaArrowUp from "react-icons/lib/fa/arrow-up"
import FaArrowDown from "react-icons/lib/fa/arrow-down"
import FaStar from "react-icons/lib/fa/star"
import FaDownload from "react-icons/lib/fa/download"

const MainHeader = ({ header }) => {
  return (
    <ul className="sort-container">
      <div className="header"> {header || "All Categories"} </div>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          align-items: center;
          padding: 0;
        }

        .header {
          font-size: 1.8rem;
          font-weight: 400;
          letter-spacing: 3px;
        }

        input {
          height: 2.4rem;
          margin-left: auto;
          width: 30%;
          box-sizing: border-box;
          padding: 0.5rem;
          color: #0a0a0a;
          border: 1px solid #cacaca;
          box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
          font-size: 1.2rem;
          line-height: normal;
          transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
        }

        input:focus {
          border: 1px solid #8a8a8a;
          background-color: #fefefe;
          outline: none;
          -webkit-box-shadow: 0 0 5px #cacaca;
          box-shadow: 0 0 5px #cacaca;
          -webkit-transition: -webkit-box-shadow 0.5s,
            border-color 0.25s ease-in-out;
          transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
        }
      `}</style>
    </ul>
  )
}

export default MainHeader
