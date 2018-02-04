import React from "react"
import Link from "next/link"
import FaGithub from "react-icons/lib/fa/github"
import FaStar from "react-icons/lib/fa/star"
import FaDownload from "react-icons/lib/fa/download"

const formatDescr = str => {
  if (str.length > 140) {
    return str.substr(0, 120).concat("...")
  } else {
    return str
  }
}

const Card = ({ link }) => {
  return (
    <div className="card-wrapper">
      <a target="blank" href={link.link}>
        <div className="card-header">{link.title}</div>
        <div className="line-seperator" />
        <div className="card-description">
          {link.description ? formatDescr(link.description) : ""}
        </div>
        <div className="card-date">
          Last Updated: <span>1/15/18</span>
        </div>
        <div className="card-stats">
          <FaStar color={"#4183c4"} size={15} /> <span> 13 </span>
          <FaDownload color={"#4183c4"} size={15} /> <span> 250 </span>
        </div>
      </a>
      <style jsx>{`
        .card-wrapper {
          background: #fff;
          box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
          transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
          position: relative;
          cursor: pointer;
          padding: 0.4rem;
        }

        .card-wrapper:hover {
          outline: none;
          -webkit-box-shadow: 0 0 5px #cacaca;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
          -webkit-transition: -webkit-box-shadow 0.5s, ease-in-out;
          transition: box-shadow 0.5s, ease-in-out;
        }

        a {
          text-decoration: none;
          color: currentcolor;
        }

        .card-header {
          padding: 10px 0 5px 10px;
          font-size: 1.2rem;
          font-weight: 100;
        }

        .line-seperator {
          margin: 2px 0 5px 10px;
          background-color: #4183c4;
          height: 1px;
          width: 45%;
        }

        .card-description {
          font-size: 1rem;
          line-height: 1.5;
          color: #5e5e5e;
          font-weight: 300;
          font-style: italic;
          padding: 0 10px;
        }

        .card-stats {
          position: absolute;
          font-weight: 100;
          padding: 0 10px 10px 0;
          bottom: 0;
          right: 0;
        }

        span {
          margin-left: 2px;
          font-size: 0.9rem;
        }

        .card-date {
          position: absolute;
          color: #4183c4;
          padding: 10px 17px;
          font-size: 0.9rem;
          font-weight: 100;
          bottom: 0;
          left: 0;
        }

        .card-date span {
          color: black;
        }
      `}</style>
    </div>
  )
}

export default Card
