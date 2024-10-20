// export const getWithCache = async (url: string, tags: string[]) => {
//   const response = await fetch(url, {
//     cache: "force-cache",
//     next: {
//       tags,
//     },
//   });
//   const result = (await response.json()) || {};

//   if (!response.ok) {
//     throw new Error(`${response.status}: ${response.statusText} : ${result?.message} for url ${url}`);
//   }
//   return result;
// };

// export const getWithoutCache = async (url: string) => {
//   const response = await fetch(url, { cache: "no-cache" });
//   const result = (await response.json()) || {};

//   if (!response.ok) {
//     throw new Error(`${response.status}: ${response.statusText} : ${result?.message} for url ${url}`);
//   }
//   return result;
// };

import mysql from "mysql2/promise";

export const dbpool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const status = async () => {
  let connection;
  try {
    connection = await dbpool.getConnection();

    return "Database is up";
  } catch (error) {
    console.error("Error connecting to database", error);
    const err = error as Error;
    const message = "Database is down. " + err;
    return message;
  } finally {
    if (connection) connection.release();
  }
};
