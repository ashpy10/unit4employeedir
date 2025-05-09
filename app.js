import express from "express"
const app = express()
import employees from "#db/employees"

app.route('/').get((req, res) =>{
    res.send("Hello employees!")
})

app.route('/employees').get((req, res) =>{
    res.send(employees)
})


app.route('/employees/random').get((req, res) => {
    console.log("Employees data:", employees);  // Log the full employees array

    let randomEmployee = employees[Math.floor(Math.random() * employees.length)];
    console.log("Random employee selected:", randomEmployee);  // Log the selected employee

    if (randomEmployee && randomEmployee.id && randomEmployee.name) {
        res.send(randomEmployee);
    } else {
        res.status(500).send("Error: Invalid employee data.");
    }
});

app.route('/employees/:id').get((req, res) =>{
    const id = Number(req.params.id);
    const found = employees.find(employee => employee.id === id);

    if(found){
        res.send(found)
    }else{
        res.status(404).send("Employee not found.")
    }
})


export default app