;(async function() {
  const fetch = require('node-fetch')
  const parser = require('./parser')
  const fs = require('fs')
  const targetAPIUrl =
    'https://api.github.com/repos/markerikson/redux-ecosystem-links/contents'
  const githubToken = '46d80ae8ba74c266fbd8ffd88e8ee5a4369928c4'
  const path = require('path')
  const databaseFile = path.join(__dirname, '../database.json')

  // Fetch the target API.
  console.log('Fetching', targetAPIUrl)
  const result = await fetch(targetAPIUrl, {
    headers: { Authorization: 'token ' + githubToken }
  })
  const json = await result.json()
  console.log('Got the JSON')

  // Download markdown files, parse the ast, and put to appropriate data structure.
  let jsonResult = { categories: [], last_update: new Date() }
  await Promise.all(
    json.map(content => {
      return (async function() {
        if (
          content.type === 'file' &&
          content.name.split('.').pop() === 'md' &&
          content.name !== 'README.md'
        ) {
          // Download the markdown file.
          console.log('Downloading', content.name)
          const result = await fetch(content.download_url)
          const text = await result.text()
          console.log('Download', content.name, 'succeed')

          // Parsing the markdown file.
          console.log('Parsing', content.name)
          const parsedObject = parser.parseMarkdown(text)
          jsonResult.categories.push(parsedObject)
          console.log('Parsing', content.name, 'succeed')
        }
      })()
    })
  )

  // Sort categories by name alphabetically.
  jsonResult.categories.sort((a, b) => {
    return (a.name > b.name) - (a.name < b.name)
  })

  // TODO: Get GitHub star data.
  // TODO: Get NPM download per month data.

  // Convert JSON to pretty string.
  const jsonString = JSON.stringify(jsonResult, null, 2)

  // Save JSON result in sync because no other instructions
  // that need to run in parallel.
  if (fs.existsSync(databaseFile)) {
    fs.truncateSync(databaseFile, 0)
  }
  console.log('Saving JSON object to', databaseFile)
  fs.writeFileSync(databaseFile, jsonString)
  console.log('Saving', databaseFile, 'succeed')

  console.log('Robot has done its job')
})()
