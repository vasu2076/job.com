const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/path");
const Job = require("./home");
const applyPath = path.join(rootDir, "data", "apply.json");

module.exports = class apply {
  static addtoapply(id, callback) {
    apply.getapply((apply) => {
      if (apply.includes(id)) {
        callback("you apply alrady this company");
      } else {
        apply.push(id);
        fs.writeFile(applyPath, JSON.stringify(apply), callback);
      }
    });
  }

  static getapply(callback) {
    fs.readFile(applyPath, (err, data) => {
      if (!err) { 
          try {
              const registeredjob = JSON.parse(data);
              callback(registeredjob);
          } catch (error) {
              console.error("Error parsing JSON:", error);
              callback([]); 
          }
      } else {
          callback([]); 
      }
  });
  
  }

  static deleteById(deljobid, callback) {
    apply.getapply(applyList => {
        const updatedApplyList = applyList.filter(id => id !== deljobid);
        fs.writeFile(applyPath, JSON.stringify(updatedApplyList), callback);
    });
}

};
