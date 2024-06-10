const express = require('express');
const { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent } = require('../controllers/studentsController');

const router = express.Router();

router.get("/read", getStudents );

router.get('/read/:id', getStudentByID);

router.post('/create', createStudent)

router.put('/update/:id', updateStudent);

router.delete('/delete/:id', deleteStudent);
module.exports = router;
