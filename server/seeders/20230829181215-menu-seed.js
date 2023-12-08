'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./menu.json', 'utf-8')).map(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Menus', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Menus', null, {})
  }
};
