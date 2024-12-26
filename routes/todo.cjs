const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync.cjs');
const {checkUser} = require('../utils/middleware.cjs')
const Todo = require('../models/todo.cjs');
const User = require('../models/user.cjs');

// /api/todo
router.get('/:userid', checkUser, catchAsync(async (req, res)=> {
    const { userid } = req.params;
    const user = await User.findById(userid).populate('todos');
    res.status(200).json(user.todos);
}));
router.post('/:userid', checkUser, catchAsync(async (req, res)=> {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }
    const newTodo = new Todo({ text });

    const {userid} = req.params;
    const user = await User.findById(userid);
    user.todos.push(newTodo);

    await newTodo.save();
    await user.save();
    res.status(201).json({ success: "登録しました" });
}));
router.patch('/:userid', checkUser, catchAsync(async (req, res)=> {
    const { userid } = req.params;
    const { todoid, text } = req.body;
    if (!todoid || !text) {
        return res.status(400).json({ error: "ID and text are required" });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(todoid, {text});
    if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    const user = await User.findById(userid);
    user.todos.map(todo=>{if(todo.id===todoid)todo.text=text})
    res.status(200).end();
}));
router.delete('/:userid/:todoid', checkUser, catchAsync(async (req, res)=> {
    const { userid, todoid } = req.params;
    if (!userid || !todoid) {
        console.log('no id')
        return res.status(400).json({ error: "userID or todoID is required" });
    }
    const user = await User.findById(userid);
    user.todos.filter(todo => todo._id !== todoid);
    await user.save()
    const deletedTodo = await Todo.findByIdAndDelete(todoid);
    if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    res.status(204).end();
}));

module.exports = router;
