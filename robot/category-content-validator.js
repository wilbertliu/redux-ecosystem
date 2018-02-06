const fetch = require('node-fetch')
const fs = require('fs')
const reduxLinksURL =
  'https://api.github.com/repos/markerikson/redux-ecosystem-links/contents'
const githubToken = '46d80ae8ba74c266fbd8ffd88e8ee5a4369928c4'
const path = require('path')
const categoryContentErrorFile = path.join(
  __dirname,
  '../category-content-error.log'
)
const githubRepoRegex = /^https:\/\/github.com\/[^\s]+\/[^\s]+$/
const ora = require('ora')
const markdown = require('markdown').markdown

function checkCategory(fileName, markdownText) {
  const ast = markdown.parse(markdownText)
  let errors = []

  // Check strictly one <h3> allowed.
  const h3Tokens = ast.filter(
    token => token[0] === 'header' && token[1].level === 3
  )
  if (h3Tokens.length > 1) {
    errors.push('<H3> appears more than once.')
  } else if (h3Tokens.length < 1) {
    errors.push('<H3> does not exist.')
  }

  // Check every <h4> should be followed by list repos.
  ast.forEach((token, index) => {
    if (token[0] === 'header' && token[1].level === 4) {
      if (
        index + 1 === ast.length ||
        (index + 1 < ast.length && ast[index + 1][0] !== 'bulletlist')
      ) {
        errors.push('<H4> is not followed by repositories.')
      } else {
        const subcategory = token[2]

        // Check every repository data.
        const nextToken = ast[index + 1]
        for (
          let listTokenIdx = 1;
          listTokenIdx < nextToken.length;
          ++listTokenIdx
        ) {
          const listItemTokens = nextToken[listTokenIdx][1]

          if (
            listItemTokens.length !== 6 ||
            typeof listItemTokens[1] !== 'object' ||
            listItemTokens[1].length !== 2 ||
            listItemTokens[1][0] !== 'strong' ||
            typeof listItemTokens[2] !== 'object' ||
            listItemTokens[2][0] !== 'linebreak' ||
            typeof listItemTokens[3] !== 'string' ||
            !githubRepoRegex.test(listItemTokens[3]) ||
            typeof listItemTokens[4] !== 'object' ||
            listItemTokens[4][0] !== 'linebreak' ||
            typeof listItemTokens[5] !== 'string'
          ) {
            const repoName =
              typeof listItemTokens[1] === 'object' &&
              listItemTokens[1].length === 2 &&
              listItemTokens[1][0] === 'strong'
                ? listItemTokens[1][1]
                : undefined
            const errorMessage =
              'Repository ' +
              (repoName === undefined ? 'number ' + listTokenIdx : repoName) +
              ' of subcategory ' +
              subcategory +
              ' has wrong structure. It should be : paragraph -> bold title string -> linebreak -> valid github repo url string -> linebreak -> description string.'
            errors.push(errorMessage)
          }
        }
      }
    }
  })

  if (errors.length === 0) {
    return {}
  }
  return { file_name: fileName, errors: errors }
}

;(async function() {
  // Fetch the target API.
  const fetchSpinner = new ora('Fetch ' + reduxLinksURL).start()
  const result = await fetch(reduxLinksURL, {
    headers: { Authorization: 'token ' + githubToken }
  })
  const json = await result.json()
  fetchSpinner.succeed()

  // Download markdown files, parse the ast, and put to appropriate data structure.
  let problems = []
  await Promise.all(
    json.map(content => {
      return (async function() {
        if (
          content.type === 'file' &&
          content.name.split('.').pop() === 'md' &&
          content.name !== 'README.md'
        ) {
          // Download the markdown file.
          const downloadSpinner = new ora('Download ' + content.name).start()
          const result = await fetch(content.download_url)
          const text = await result.text()
          downloadSpinner.succeed()

          // Check the markdown file.
          const checkSpinner = new ora('Check ' + content.name).start()
          const report = checkCategory(content.name, text)
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
    'Save file to ' + categoryContentErrorFile
  ).start()

  // Convert JSON to readable string.
  let reportString = ''
  problems.forEach((problem, index) => {
    reportString += problem.file_name

    reportString += problem.errors.reduce((previousValue, currentValue) => {
      return previousValue + '\n- ' + currentValue
    }, '')

    if (index < problems.length - 1) {
      reportString += '\n\n'
    }
  })

  if (fs.existsSync(categoryContentErrorFile)) {
    fs.truncateSync(categoryContentErrorFile, 0)
  }
  fs.writeFileSync(categoryContentErrorFile, reportString)
  saveFileSpinner.succeed()
})()
