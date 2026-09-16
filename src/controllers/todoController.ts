import { Request, Response } from "express";

import { todoModel } from "../models/todoModel.js";

export const getTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = res.locals.userId;

  try {
    const todos = await todoModel.getByUserId(userId);

    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data.",
    });
  }
};

// GET /api/todos/:id - Ambil satu todo berdasarkan ID
export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const todo = await todoModel.getById(Number(id), userId);

    // Jika undefined, berarti todo tidak ditemukan atau bukan milik user ini
    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Tugas tidak ditemukan!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data.",
    });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { task } = req.body;
  const userId = res.locals.userId;

  try {
    const newId = await todoModel.create(userId, task);

    res.status(201).json({
      success: true,
      message: "Tugas berhasil ditambahkan!",
      data: {
        id: newId,
        task,
        is_completed: false,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan tugas.",
    });
  }
};

// PUT /api/todos/:id - Update todo
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { task, is_completed } = req.body;
  const userId = res.locals.userId;

  try {
    const affectedRows = await todoModel.update(
      Number(id),
      task,
      is_completed,
      userId
    );

    if (affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Tugas tidak ditemukan!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Tugas berhasil diperbarui!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui tugas.",
    });
  }
};

// DELETE /api/todos/:id - Hapus todo
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const affectedRows = await todoModel.delete(
      Number(id),
      userId
    );

    if (affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Tugas tidak ditemukan!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Tugas berhasil dihapus!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menghapus tugas.",
    });
  }
};