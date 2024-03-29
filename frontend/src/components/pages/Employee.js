import React from "react";
import { useState , useEffect} from "react";
import Dashboardtemplate from "../UI/Dashboardtemplate";
import "../../public/assests/employee.css";
import EmployeeList from "../cards_container/EmployeeList";
import Addemployee from "../popup-models/Addemployee";
import Editemployee from "../popup-models/Editemployee";
import Deleteemployee from "../popup-models/Deleteemployee";
import { useSelector, useDispatch } from "react-redux";
import { getEmployee } from "../store/actions/employee-actions";


export default function Employee() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const NULLURL = ""
  const [Emp, setEmp] = useState({})
  // const [eid,seteid] = useState({})
  const useremail = String(user.email)
  const adminrole = useremail.includes("@manager")
  console.log(adminrole);

  useEffect(() => {
    dispatch(getEmployee(user._id));
}, [dispatch, user._id]);

const employees = user.employees;

  const EmployeeHandler = (event, eId) => {
    employees.forEach(employee => {
      if(employee.id === eId) {
        console.log("from handler: ", employee);
        setEmp(employee);
        return;
      }
    })
    // seteid(eId)
  };

  return (
    <Dashboardtemplate>
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Employee</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Employee</li>
            </ul>
          </div>
          {
            adminrole && <div className="col-auto float-right ml-auto">
            <a
              href={NULLURL}
              className="btn add-btn"
              data-bs-toggle="modal"
              data-bs-target="#add_employee"
            >
              <i className="fa fa-plus"></i> Add Employee
            </a>
          </div>
          }
          
        </div>
      </div>


      {/* employees list */}
      <div className="row staff-grid-row" >
        { employees && <EmployeeList employeeHandler={EmployeeHandler} />}
      </div>

      <Addemployee/>
      <Editemployee emp = {Emp} />
      <Deleteemployee emp = {Emp}/>

    </Dashboardtemplate>
  );
}

