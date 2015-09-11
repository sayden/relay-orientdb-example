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
    if (!(object instanceof Array)){
      object = [object];
    }

    object.map(object => {
      return Object.keys(object).forEach(key => {
        var val = object[key];
        if(key == "@rid"){
          object.id = val;
          delete object["@rid"];
        } else {
          if(val instanceof Array){
             parse(val);
          }
        }
      });
    });
  }

  parse(object);
  console.log(object);
}

parseResponse(json);
