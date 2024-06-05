import Todo from "../models/todoModel.mjs";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, description, duration } = req.body;
    const newTodo = new Todo({
      title,
      description,
      duration,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, duration, completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (todo) {
      res.json({ message: "Todo deleted successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCompletedTodos = async (req, res) => {
  try {
    const completedTodos = await Todo.find({ completed: true });
    res.json(completedTodos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
