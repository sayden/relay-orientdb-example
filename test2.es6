var json = {
  "@rid":"11:0",
  name:"name",
  surname: "surname",
  friends:[{
    "@rid":"11:0",
    name:"name",
    surname: "surname",
  },{
    "@rid":"12:0",
    name:"name",
    surname: "surname",
  },{
    "@rid":"13:0",
    name:"name",
    surname: "surname",
    friends:[{
      "@rid":"11:0",
      name:"name",
      surname: "surname",
    },{
      "@rid":"12:0",
      name:"name",
      surname: "surname",
    },{
      "@rid":"13:0",
      name:"name",
      surname: "surname",
    }]
  }],
  age:29
};

function parseResponse(object){

  function parse(object){
    Object.keys(object).forEach(key => {
      var val = object[key];
      if(key == "@rid"){
        object.id = val;
        delete object["@rid"];
      } else {
        if(val instanceof Array){
          // console.log(val);
          val.apply(this, parse);
          // console.log(temp);
        }
      }
    });
  }

  let res = parse(object);
  console.log(object);
}

parseResponse(json);
