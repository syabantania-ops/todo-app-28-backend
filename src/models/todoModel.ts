import pool from "../config/db.js";

export const todoModel = {
  getByUserId: async (userId: number) => {
    const [rows] = await pool.query(
      "SELECT * FROM todos WHERE user_id = ?",
      [userId]
    );

    return rows;
  },

  getById: async (id: number, userId: number) => {
    const [rows]: any = await pool.query(
      "SELECT * FROM todos WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    return rows[0];
  },

  create: async (userId: number, task: string) => {
    const [result]: any = await pool.query(
      "INSERT INTO todos (user_id, task) VALUES (?, ?)",
      [userId, task]
    );

    return result.insertId;
  },

  update: async (
    id: number,
    task: string,
    isCompleted: boolean,
    userId: number
  ) => {
    const [result]: any = await pool.query(
      "UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?",
      [task, isCompleted, id, userId]
    );

    return result.affectedRows;
  },

  delete: async (id: number, userId: number) => {
    const [result]: any = await pool.query(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    return result.affectedRows;
  },
};