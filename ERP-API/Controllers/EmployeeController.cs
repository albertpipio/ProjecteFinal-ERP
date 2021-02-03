using Microsoft.AspNetCore.Mvc;
using ERP_API.Models;
using System.Linq;
using ERP_API.Models.Response;
using ERP_API.Models.Request;
using System;
using Microsoft.AspNetCore.Authorization;

namespace ERP_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.Exito = 0;
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    var lst = db.Employees.OrderByDescending(d => d.Id).ToList();
                    oRespuesta.Exito = 1;
                    oRespuesta.Data = lst;
                }
            }
            catch (Exception ex)
            {
                oRespuesta.Mensaje = ex.Message;
            }

            return Ok(oRespuesta);
        }

        [HttpPost]
        public IActionResult Add(EmployeeRequest oModel)
        {
            Respuesta oRespuesta = new Respuesta();
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    Employee oEmployee = new Employee();
                    oEmployee.Name = oModel.Name;
                    oEmployee.Surname = oModel.Surname;
                    oEmployee.Email = oModel.Email;
                    oEmployee.PastOrders = oModel.PastOrders;
                    oEmployee.CompletedOrders = oModel.CompletedOrders;
                    oEmployee.Salary = oModel.Salary;
                    db.Employees.Add(oEmployee);
                    db.SaveChanges();
                    oRespuesta.Exito = 1;
                }
            }
            catch (Exception ex)
            {
                oRespuesta.Mensaje = ex.Message;
            }
            return Ok(oRespuesta);
        }

        [HttpPut]
        public IActionResult Edit(EmployeeRequest oModel)
        {
            Respuesta oRespuesta = new Respuesta();
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    Employee oEmployee = db.Employees.Find(oModel.Id);
                    oEmployee.Name = oModel.Name;
                    oEmployee.Surname = oModel.Surname;
                    oEmployee.Email = oModel.Email;
                    oEmployee.PastOrders = oModel.PastOrders;
                    oEmployee.CompletedOrders = oModel.CompletedOrders;
                    oEmployee.Salary = oModel.Salary;
                    db.Entry(oEmployee).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                    oRespuesta.Exito = 1;
                }
            }
            catch (Exception ex)
            {
                oRespuesta.Mensaje = ex.Message;
            }

            return Ok(oRespuesta);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(Guid Id)
        {
            Respuesta oRespuesta = new Respuesta();
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    Employee oEmployee = db.Employees.Find(Id);
                    db.Remove(oEmployee);
                    db.SaveChanges();
                    oRespuesta.Exito = 1;
                }
            }
            catch (Exception ex)
            {
                oRespuesta.Mensaje = ex.Message;
            }

            return Ok(oRespuesta);
        }
    }
}