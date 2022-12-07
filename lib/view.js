const Option = require('./option.js');
const Query = require('./query');
const connection = new Query().getConnection();

class View extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = () => {
    return new Promise((resolve, reject)=>{
        connection.query(this.query, (error, result)=>{
            if(error){
                console.log("error in query")
                return reject(error);
            }
            console.table(result);
            return resolve(result);
        });
    });
  };

}

module.exports = View;