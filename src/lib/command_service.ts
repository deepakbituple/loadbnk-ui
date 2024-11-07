import { getWithCache, getWithoutCache, putNoCache } from "./db_utils";

interface ICommand {
  code: string;
  value: string;
  controller: string;
  last_updated: Date;
}

const deviceCommandMappings = new Map<string, string>([
  ["OP1", "OPCOMMAND1"],
  ["OP2", "OPCOMMAND2"],
  ["OP3", "OPCOMMAND3"],
  ["OP4", "OPCOMMAND4"],
  ["OP5", "OPCOMMAND5"],
  ["OP6", "OPCOMMAND6"],
  ["OP7", "OPCOMMAND7"],
  ["OP8", "OPCOMMAND8"],
  ["OP9", "OPCOMMAND9"],
]);

const SERVER_URL = process.env.BACKEND_SERVER_URL || "http://localhost:3000";
// export const getCommands = async (controller: string): Promise<ICommand[]> => {
//   let commands: ICommand[] = [];

//   const URL = SERVER_URL + "/api/commands?controller=" + controller;
//   try {
//     const data = await URL;
//     console.log("data", data);

//     const response = await putNoCache(URL, );
//   } catch (error) {
//     console.error("Error fetching commands from database", error);
//     throw error;
//   } finally {
//     // if (connection) connection.release();
//   }

//   return commands;
// };

// const getByCommandCode = async (controller: string, code: string): Promise<ICommand | null> => {
//   let connection;
//   const query = "SELECT * FROM commands where controller = ? and code = ?";
//   // execute the query and return the result
//   try {
//     connection = await dbpool.getConnection();

//     const [results] = (await connection.query(query, [controller, code])) as [any[], any];
//     if (results.length > 0) {
//       return {
//         controller: results[0].controller,
//         code: results[0].code,
//         value: results[0].value,
//         last_updated: results[0].last_updated,
//       };
//     }
//     return null;
//   } catch (error) {
//     console.error("Error fetching commands from database", error);
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// };

// export const createCommand = async (command: ICommand) => {
//   let connection;
//   const query = "INSERT INTO commands (controller, code, value, last_updated) VALUES (?, ?, ?, ?)";
//   // execute the query and return the result
//   try {
//     connection = await dbpool.getConnection();
//     await connection.beginTransaction();
//     await connection.query(query, [command.controller, command.code, command.value, new Date()]);
//     await connection.commit();
//   } catch (error) {
//     console.error("Error saving commands in database", error);
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// };

// export const createMultipleCommands = async (commands: ICommand[]) => {
//   let connection;
//   const query = "INSERT INTO commands (controller, code, value, last_updated) VALUES ?";
//   // execute the query and return the result
//   try {
//     connection = await dbpool.getConnection();
//     await connection.beginTransaction();
//     const values = commands.map((command) => [command.controller, command.code, command.value, new Date()]);
//     await connection.query(query, [values]);
//     await connection.commit();
//   } catch (error) {
//     console.error("Error saving commands in database", error);
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// };

export const updateCommand = async (controller: string, device: string, status: string) => {
  console.log("Updating command ", controller, ":", device, " with status ", status);
  try {
    const url = SERVER_URL + "/api/commands/" + controller + "/" + device;
    const response = await putNoCache(url, { value: status });
    console.log("response from update command", response);
  } catch (error) {
    console.error("Error updating commands in database", error);
    // connection?.rollback();
    throw error;
  } finally {
    // if (connection) connection.release();
  }
};
