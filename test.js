import OrientDbSingleton from './data/OrientDbSingleton.es6';

let db = OrientDbSingleton.getInstance();

//Do some query
db.record.get("#11:0").then(res => {
  console.log(res.name);

  db.query("SELECT FROM Hobby WHERE title=:title", {params:{title:"cycling"}}).then(res => {
    res.map(hobby => {
      console.log(hobby.title);
    });

    db.select().from("User").all().then(res => {
      res.map(user => {
        console.log(user.name);
      });
      OrientDbSingleton.closeConnection();
    });
  });
});