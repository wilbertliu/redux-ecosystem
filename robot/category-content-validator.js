const fetch = require("node-fetch")
const fs = require("fs")
const path = require("path")

// The token must be the only text in the file, i.e. no newline
const githubTokenBuffer = fs.readFileSync(path.resolve(__dirname, '../githubToken.txt'))
const githubToken = Buffer.from(githubTokenBuffer).toString()

const categoryContentErrorFile = path.join(
  __dirname,
  "../category-content-error.md"
)
const githubRepoRegex = /^https:\/\/github.com\/[^\s]+\/[^\s]+$/
const ora = require("ora")
const remark = require('remark')()

const fetchJSON = async (uri) => fetch(uri, { headers: { Authorization: "token " + githubToken } }).then(r => r.json())

// This is hardcoded for now because it would need to be fetched in an async function
const reduxLinksURL = 'https://api.github.com/repos/markerikson/redux-ecosystem-links/git/trees/804e89f58ec3d828bdb3b1f3d977c41d803de428'

function checkCategory(fileName, markdownText) {
  const ast = remark.parse(markdownText)
  const childrens = ast.children
  let errors = []

  for (let index = 0; index < childrens.length; ++index) {
    const children = childrens[index]

    // Check whether or not the first node is H3.
    if (index === 0) {
      if (children.type !== "heading" || children.depth !== 3) {
        errors.push("Saw: " + remark.stringify(children) + " —— Expected: H3 of category title.")
      }
      continue
    }

    /*
      The following lines assume that we're not on the first node.
    */

    // Check whether or not the current node is H4.
    if (children.type !== "heading" || children.depth !== 4) {
      errors.push("Saw: " + remark.stringify(children) + " —— Expected: H4 of subcategory title.")
      continue
    }

    // Check whether or not the next node it's a list of repository.
    if (index + 1 < childrens.length) {
      index = index + 1
      const mustBeList = childrens[index]

      if (mustBeList.type !== "list" || mustBeList.children.length === 0) {
        errors.push("Saw: " + remark.stringify(mustBeList) + " —— Expected: List of repository.")
        continue
      }

      mustBeList.children.forEach(mustBeListItem => {
        if (mustBeListItem.type !== "listItem" || mustBeListItem.children.length === 0) {
          errors.push("Saw: " + remark.stringify(mustBeListItem) + " —— Expected: Repository item.")
          return
        }

        const mustBeParagraph = mustBeListItem.children[0]

        if (mustBeParagraph.type !== "paragraph") {
          errors.push("Saw: " + remark.stringify(mustBeParagraph) + " —— Expected: Repository item.")
          return
        }

        if (mustBeParagraph.children.length < 1) {
          errors.push("Saw: " + remark.stringify(mustBeParagraph) + " —— Expected: Repository title.")
          return
        } else {
          const mustBeStrong = mustBeParagraph.children[0]

          if (mustBeStrong.type !== "strong") {
            errors.push("Saw: " + remark.stringify(mustBeStrong) + " —— Expected: <strong> in repository title.")
          } else {
            if (mustBeStrong.children.length === 0 || mustBeStrong.children[0].type !== "text" || mustBeStrong.children[0].value === "") {
              errors.push("Saw: " + remark.stringify(mustBeStrong.children) + " —— Expected: Repository title.")
            }
          }
        }

        if (mustBeParagraph.children.length < 2) {
          errors.push("Saw: " + remark.stringify(mustBeParagraph) + " —— Expected: <br /> after repository title.")
          return
        } else {
          const mustBeBreak = mustBeParagraph.children[1]

          if (mustBeBreak.type !== "break") {
            errors.push("Saw: " + remark.stringify(mustBeBreak) + " —— Expected: <br /> after repository title.")
          }
        }

        if (mustBeParagraph.children.length < 3) {
          errors.push("Saw: " + remark.stringify(mustBeParagraph) + " —— Expected: GitHub repo link.")
          return
        } else {
          const mustBeGitHubRepoLink = mustBeParagraph.children[2]

          if (mustBeGitHubRepoLink.type !== "link") {
            errors.push("Saw: " + remark.stringify(mustBeGitHubRepoLink) + " —— Expected: <a> in repository link.")
          } else {
            if (!githubRepoRegex.test(mustBeGitHubRepoLink.url)) {
              errors.push("Saw: " + remark.stringify(mustBeGitHubRepoLink) + " —— Expected: Valid GitHub repository link.")
            }
          }
        }

        if (mustBeParagraph.children.length < 4) {
          errors.push("Saw: " + remark.stringify(mustBeParagraph) + " —— Expected: <br /> after repository link.")
          return
        } else {
          const mustBeBreak = mustBeParagraph.children[3]

          if (mustBeBreak.type !== "break") {
            errors.push("Saw: " + remark.stringify(mustBeBreak) + " —— Expected: <br /> after repository link.")
          }
        }

        if (mustBeParagraph.children.length < 5) {
          errors.push("Saw: " + remark.stringify(mustBeParagraph) + " —— Expected: Repository description.")
          return
        } else {
          const mustBeText = mustBeParagraph.children[4]

          if (mustBeText.type !== "text" || mustBeText.value === "") {
            errors.push("Saw: " + remark.stringify(mustBeText) + " —— Expected: Repository description.")
          }
        }
      })
    } else {
      errors.push("Saw: end of file —— Expected: List of repository.")
    }
  }

  if (errors.length === 0) {
    return {}
  }
  return { file_name: fileName, errors: errors }
}

;(async function() {
  // Fetch the target API.
  const fetchSpinner = new ora("Fetch " + reduxLinksURL).start()
  const json = await fetchJSON(reduxLinksURL)
  fetchSpinner.succeed()

  // Download markdown files, parse the ast, and put to appropriate data structure.
  let problems = []
  await Promise.all(
    json.tree.map(content => {
      return (async function() {
        if (
          content.type === "blob" &&
          content.path.split(".").pop() === "md" &&
          content.path !== "README.md"
        ) {
          // Download the markdown file.
          const downloadSpinner = new ora("Download " + content.path).start()
          const encoded = (await fetchJSON(content.url)).content
          const text = Buffer.from(encoded, 'base64').toString('ascii')
          downloadSpinner.succeed()

          // Check the markdown file.
          const checkSpinner = new ora("Check " + content.path).start()
          const report = checkCategory(content.path, text)
          if (report.errors === undefined) {
            checkSpinner.succeed()
          } else {
            checkSpinner.fail()
            problems.push(report)
          }
        }
      })()
    })
  )

  // Sort problems by file name alphabetically.
  problems.sort((a, b) => {
    return (a.file_name > b.file_name) - (a.file_name < b.file_name)
  })

  const saveFileSpinner = new ora(
    "Save file to " + categoryContentErrorFile
  ).start()

  // Convert JSON to readable string.
  let reportString = ""
  problems.forEach((problem, index) => {
    reportString += "**" + problem.file_name + "**"

    reportString += problem.errors.reduce((previousValue, currentValue) => {
      return previousValue + "\n- " + currentValue
    }, "")

    if (index < problems.length - 1) {
      reportString += "\n\n"
    }
  })

  if (fs.existsSync(categoryContentErrorFile)) {
    fs.truncateSync(categoryContentErrorFile, 0)
  }
  fs.writeFileSync(categoryContentErrorFile, reportString)
  saveFileSpinner.succeed()
})()
