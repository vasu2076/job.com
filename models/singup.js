const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/path");

module.exports = class user {
    constructor(name,password){
        this.name = name;
        this.password = password;
    }


save()  {
     let userdata = [];
       user.fetchall((userdata) => {
         userdata.push(this);
         const filePath = path.join(rootDir, 'data', 'user.json');
         fs.writeFile(filePath, JSON.stringify(userdata), (err) => {
           if (err) {
             console.log("Error:", err);
           }
         });
       });
}

static fetchall(callback) {
    const filePath = path.join(rootDir, 'data', 'user.json');
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        // Use JSON.parse instead of json.parse
        const userdata = JSON.parse(data);
        callback(userdata);
      } else {
        callback([]);
      }
    });
  }
}