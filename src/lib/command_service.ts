import { dbpool } from "./db_utils";

interface ICommand {
  code: string;
  value: string;
  controller: string;
  last_updated: Date;
}

const deviceCommands = new Map<string, string>([
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

export const getCommands = async (controller: string): Promise<ICommand[]> => {
  const commands: ICommand[] = [];
  let connection;
  const query = "SELECT * FROM commands where controller = '" + controller + "'";

  try {
    connection = await dbpool.getConnection();
    const [results, fields] = (await connection.query(query)) as [any[], any];
    console.log("fetch command Results: ", results, "fields: ", fields);
    for (const row of results) {
      const command: ICommand = {
        controller: row.controller,
        code: row.code,
        value: row.value,
        last_updated: row.last_updated,
      };
      commands.push(command);
    }
  } catch (error) {
    console.error("Error fetching commands from database", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }

  return commands;
};

const getByCommandCode = async (controller: string, code: string): Promise<ICommand | null> => {
  let connection;
  const query = "SELECT * FROM commands where controller = ? and code = ?";
  // execute the query and return the result
  try {
    connection = await dbpool.getConnection();

    const [results] = (await connection.query(query, [controller, code])) as [any[], any];
    if (results.length > 0) {
      return {
        controller: results[0].controller,
        code: results[0].code,
        value: results[0].value,
        last_updated: results[0].last_updated,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching commands from database", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export const createCommand = async (command: ICommand) => {
  let connection;
  const query = "INSERT INTO commands (controller, code, value, last_updated) VALUES (?, ?, ?, ?)";
  // execute the query and return the result
  try {
    connection = await dbpool.getConnection();
    await connection.beginTransaction();
    await connection.query(query, [command.controller, command.code, command.value, new Date()]);
    await connection.commit();
  } catch (error) {
    console.error("Error saving commands in database", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export const createMultipleCommands = async (commands: ICommand[]) => {
  let connection;
  const query = "INSERT INTO commands (controller, code, value, last_updated) VALUES ?";
  // execute the query and return the result
  try {
    connection = await dbpool.getConnection();
    await connection.beginTransaction();
    const values = commands.map((command) => [command.controller, command.code, command.value, new Date()]);
    await connection.query(query, [values]);
    await connection.commit();
  } catch (error) {
    console.error("Error saving commands in database", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export const updateCommand = async (controller: string, device: string, status: string) => {
  let connection;
  const command = deviceCommands.get(device);
  if (!command) {
    throw new Error("Command not found for device " + device);
  }
  //   const existingCommand = await getByCommandCode(controller, command.code);
  //   if (!existingCommand) {
  //     throw new Error("Command not found with code " + command.code);
  //   }
  const updateQuery = "UPDATE commands SET value = ?, last_updated = ? WHERE code = ? and controller = ?";
  const currentDateTime = new Date();
  console.log("Updating command ", command, " with status ", status);
  try {
    connection = await dbpool.getConnection();
    await connection.beginTransaction();
    await connection.query(updateQuery, [status, currentDateTime, command, controller]);
    await connection.commit();
  } catch (error) {
    console.error("Error updating commands in database", error);
    connection?.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
