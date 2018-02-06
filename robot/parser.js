const markdown = require('markdown').markdown

exports.parseMarkdown = text => {
  const ast = markdown.parse(text)
  let category = '',
    subcategories = [],
    repos = []
  ast.forEach(token => {
    // No need to process a raw string.
    if (typeof token === 'string') {
      return
    }

    // If current token is <h3>, then it's a category.
    if (token[0] === 'header' && token[1].level === 3) {
      category = token[2]
      return
    }

    // If current token is <h4>, then it's a subcategory.
    if (token[0] === 'header' && token[1].level === 4) {
      subcategories.push(token[2])
      return
    }

    // If current token is <ul> and there's new subcategory,
    // then its list item belongs to the respective subcategory.
    if (
      token[0] === 'bulletlist' &&
      subcategories.length === repos.length + 1
    ) {
      let currentRepos = []
      for (let listTokenIdx = 1; listTokenIdx < token.length; ++listTokenIdx) {
        let currentRepo = []
        for (
          let listItemTokenIdx = 1;
          listItemTokenIdx < token[listTokenIdx][1].length;
          ++listItemTokenIdx
        ) {
          const listItemToken = token[listTokenIdx][1][listItemTokenIdx]
          if (
            typeof listItemToken === 'object' &&
            listItemToken[0] === 'strong'
          ) {
            currentRepo.push(listItemToken[1])
          } else if (typeof listItemToken === 'string') {
            currentRepo.push(listItemToken)
          }
        }
        currentRepos.push(currentRepo)
      }
      repos.push(currentRepos)
    }
  })
  return {
    name: category,
    subcategories: subcategories.map((subcategory, subcategoryIdx) => {
      return {
        name: subcategory,
        repositories: repos[subcategoryIdx].map(repo => {
          return { name: repo[0], github_url: repo[1], description: repo[2] }
        })
      }
    })
  }
}
