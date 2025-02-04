const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/path");

module.exports = class Job {
  constructor(jobname, companyname, jobdescription, location, jobtype, salary, contactemail, position) {
    this.jobname = jobname;
    this.companyname = companyname;
    this.jobdescription = jobdescription;
    this.location = location;
    this.jobtype = jobtype;
    this.salary = salary;
    this.contactemail = contactemail;
    this.position = position;
  }

  save() {
    this.id = Math.random().toString();
    Job.fetchall((registeredjob) => {
      registeredjob.push(this);
      const filePath = path.join(rootDir, 'data', 'job.json');
      fs.writeFile(filePath, JSON.stringify(registeredjob), (err) => {
        if (err) {
          console.log("Error:", err);
        }
      });
    });
  }

  static fetchall(callback) {
    const filePath = path.join(rootDir, 'data', 'job.json');
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        // Use JSON.parse instead of json.parse
        const registeredjob = JSON.parse(data);
        callback(registeredjob);
      } else {
        callback([]);
      }
    });
  }
}