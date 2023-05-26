const categoryRoute = require('express').Router()
const CategoryController = require('../controller/categoryController')

categoryRoute.get(`/all`, CategoryController.getAll)
categoryRoute.get(`/single/:id`, CategoryController.getSingle)

categoryRoute.post(`/create`,  CategoryController.create)

categoryRoute.patch(`/update/:id`, CategoryController.update)

categoryRoute.delete(`/delete/:id`,  CategoryController.delete)

module.exports = categoryRoute