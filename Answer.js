const https = require("https");
const request = require("request");
let express = require("express");
let app = express();
app.use(express.static(`main`));
const fs = require("fs");
var cors = require('cors')
app.use(cors())

const port = 5900;

const server = https.createServer(function (req, res) {
 
  res.end();
});


server.listen(port, function (error) {
  // Checking for any error or not
  if (error) {
    console.log("Something went wrong", error);
  }
  
  else {
    console.log("Server is listening on port" + port);
  }
});

const result = []
request(
  {
    uri: "https://time.com/",
  },
  function (err, res, body) {
    
    fs.writeFile("Time.html", body, err => {
      if (err) {
        console.error(err);
      }
      
    });
  }
);

fs.readFile("Time.html", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  }
  const data_required = data.split('<li class="latest-stories__item">');// Here i am splitting the data as we need these data for top 6 stories

  console.log("These are the latest 6 stories from times.com");
  for (var i = 1;i<=6;i+=1)
  {
    // console.log(new_data[i]);
    const link_part = data_required[i];
    const Answer = link_part.split('"');
    const link = "https://time.com/"+Answer[1]; 
      
    
    const title = Answer[4].split('>')[1].split("</h3")[0] 
    result.push({title,link});
	
	console.log("        ");
    console.log('Title : ' + title); // i am printing the title
	console.log('Link : ' + link); // i am printing the link
    

  }
});
console.log(result);
app.get("/getTimeStories", function (req, res) {
  res.json(result);
});
app.listen(6000);