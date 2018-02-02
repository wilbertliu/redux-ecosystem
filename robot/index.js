;(async function() {
  const fetch = require('node-fetch')
  const targetAPIUrl =
    'https://api.github.com/repos/markerikson/redux-ecosystem-links/contents'
  const fs = require('fs')
  const util = require('util')
  const mkdir = util.promisify(fs.mkdir)
  const writeFile = util.promisify(fs.writeFile)
  const unlink = util.promisify(fs.unlink)
  const rmdir = util.promisify(fs.rmdir)

  // Fetch the target API.
  console.log('Fetching', targetAPIUrl)
  const result = await fetch(targetAPIUrl)
  const json = await result.json()
  console.log('Got the JSON')

  // Create markdown folder to put downloaded markdown files.
  console.log('Creating markdown folder')
  await mkdir('markdown')
  console.log('Markdown folder created')

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

          // Create a markdown file inside the markdown folder.
          console.log('Creating file', content.name)
          await writeFile('markdown/' + content.name, text)
          console.log('File', content.name, 'created')
        }
      })()
    })
  )

  // TODO: Parse markdown files to create JSON database.

  // Delete processed markdown files and folder.
  await Promise.all(
    json.map(content => {
      return (async function() {
        if (
          content.type === 'file' &&
          content.name.split('.').pop() === 'md' &&
          content.name !== 'README.md'
        ) {
          console.log('Deleting file', content.name)
          await unlink('markdown/' + content.name)
          console.log('File', content.name, 'deleted')
        }
      })()
    })
  )
  console.log('Deleting markdown folder')
  await rmdir('markdown')
  console.log('Markdown folder deleted')

  console.log('Robot has done its job')
})()
