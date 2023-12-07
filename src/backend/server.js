const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Felice88",
  port: 5432,
});

app.get("/getData", (req, res) => {
  try {
    const query = `SELECT * FROM "TumoriPolmone" WHERE "popolazione" = 84`;
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw new Error("Errore nel recupero dei dati");
      } else {
        console.log(results);
        res.json(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nell'esecuzione della query" });
  }
  //   const query = `SELECT * FROM "TumoriPolmone" WHERE "popolazione" = 84`;
  //   pool.query(query, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       res.status(500).json({ error: "Errore nel recupero dei dati" });
  //     } else {
  //       console.log(results);
  //       res.json(results);
  //     }
  //   });
});

app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});
