const express = require("express")
const next = require("next")
const database = require("./database.json")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get("/topics.json", function(req, res) {
      const topics = database.categories.map(topics => topics.name)

      res.send(topics)
    })

    server.get("/category.json/:name", function(req, res) {
      const category = database.categories.filter(
        category => category.name == req.params.name
      )

      res.send(category[0])
    })

    server.get("/subcategory.json/:category/:subcategory", function(req, res) {
      const category = database.categories.filter(
        category => category.name == req.params.category
      )

      const subcategory = category[0].subcategories.filter(
        subcategory => subcategory.name == req.params.subcategory
      )

      res.send(subcategory[0])
    })

    server.get("/:name", (req, res) => {
      const actualPage = "/topic"
      const queryParams = { name: req.params.name }

      app.render(req, res, actualPage, queryParams)
    })

    server.get("/:name/:subcategory", (req, res) => {
      const actualPage = "/subcategory"
      const queryParams = {
        name: req.params.name,
        subcategory: req.params.subcategory
      }

      app.render(req, res, actualPage, queryParams)
    })

    server.get("*", (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log("> Ready on http://localhost:3000")
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
