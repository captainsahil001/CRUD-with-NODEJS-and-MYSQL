const db = require("../config/db");

const getStudents = async (req,res) => {
    try {
        const data = await db.query(' SELECT * FROM students');
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No records found",
            });
        }
        res.status(200).send({
            success:true,
            message: "All Students Records",
            totalStudents: data[0].length,
            data: data[0],
        });
    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get All Student API',
            error
        });
    }
};

const getStudentByID = async (req,res) => {
    try{
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Inavalid or Provide Student id'
            });
        }
        const data = await db.query(`SELECT * FROM students WHERE id=?`,[studentId])
            if (!data){
                return res.status(404).send({
                   success:false,
                   message:'no records found' 
                });
            }
            res.status(200).send({
                success:true,
                studentDetails: data[0],
            });
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get student by API',
            error
        });
    }
};

const createStudent = async(req,res) => {
    try {
       const {name,roll_no,fees, medium} = req.body
        if (!name || !roll_no ||  !fees || !medium) {
            return res.status(500).send({
                success:false,
                message:'Please Provide all fields'
            })
        }
        const data = await db.query(`INSERT INTO students (name,roll_no,fees,medium) VALUES(? , ? , ? , ? )`,[name,roll_no,fees,medium])
        if(!data){
            return req.status(404).send({
                success:false,
                message:'Error in Insert Query',
            })
        }
        res.status(201).send({
            success:true,
            message:'New Student Record Created',
        })
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        message:'Error in Create Student API',
        error
       }) 
    }
};

const updateStudent = async (req,res) => {
    try {
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Inavlid ID or provide id'
            })
        }
        const {name,roll_no,fees,medium} = req.body
        const data = await db.query(`UPDATE students SET name = ?,roll_no = ?, fees = ?, medium = ? WHERE id =? `,[name,roll_no,fees,medium,studentId])
        if(!data){
            return res.status(500).send({
                success:false,
                message:'Error in update Data'
            })
        }
        res.status(200).send({
            success:true,
            message:'Student Details'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update of Student API',
            error
        })
    }
};

const deleteStudent = async (req,res) => {
    try {
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Please provide student id or valid student ID'
            })
        }
        await db.query(`DELETE FROM students WHERE id = ?`, [studentId]);
        res.status(200).send({
            success:true,
            message:'Student Deleted Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Delete Student API',
            error
        })
    }
}

module.exports = { getStudents,getStudentByID ,createStudent,updateStudent,deleteStudent};
