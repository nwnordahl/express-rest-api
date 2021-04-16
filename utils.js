const fs = require("fs");

function writeToFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  writeToFile,
};
