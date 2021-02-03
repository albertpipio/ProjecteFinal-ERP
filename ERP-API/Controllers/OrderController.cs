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
    public class OrderController : ControllerBase
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
                    var lst = db.Orders.OrderByDescending(d => d.Id).ToList();
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
        public IActionResult Add(OrderRequest oModel)
        {
            Respuesta oRespuesta = new Respuesta();
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    Order oOrder = new Order();
                    oOrder.Status = oModel.Status;
                    oOrder.Priority = oModel.Priority;
                    oOrder.Client = oModel.Client;
                    oOrder.Employee = oModel.Employee;
                    oOrder.DateOfCreation = oModel.DateOfCreation;
                    oOrder.DateOfAssignment = oModel.DateOfAssignment;
                    oOrder.DateOfCompletion = oModel.DateOfCompletion;
                    oOrder.Address = oModel.Address;
                    oOrder.Price = oModel.Price;
                    db.Orders.Add(oOrder);
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
        public IActionResult Edit(OrderRequest oModel)
        {
            Respuesta oRespuesta = new Respuesta();
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    Order oOrder = db.Orders.Find(oModel.Id);
                    oOrder.Status = oModel.Status;
                    oOrder.Priority = oModel.Priority;
                    oOrder.Client = oModel.Client;
                    oOrder.Employee = oModel.Employee;
                    oOrder.DateOfCreation = oModel.DateOfCreation;
                    oOrder.DateOfAssignment = oModel.DateOfAssignment;
                    oOrder.DateOfCompletion = oModel.DateOfCompletion;
                    oOrder.Address = oModel.Address;
                    oOrder.Price = oModel.Price;
                    db.Entry(oOrder).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
                    Order oOrder = db.Orders.Find(Id);
                    db.Remove(oOrder);
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