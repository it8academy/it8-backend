const easyinvoice = require("easyinvoice");
const fs = require("fs");

const createInvoice = async (data) => {
  const result = await easyinvoice.createInvoice(data);
};

module.exports = createInvoice;
