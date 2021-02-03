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
    public class WarehouseController : ControllerBase
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
                    var lst = db.Warehouses.OrderByDescending(d => d.Id).ToList();
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
        public IActionResult Add(WarehouseRequest oModel)
        {
            Respuesta oRespuesta = new Respuesta();
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    Warehouse oWarehouse = new Warehouse();
                    oWarehouse.Category = oModel.Category;
                    db.Warehouses.Add(oWarehouse);
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
        public IActionResult Edit(WarehouseRequest oModel)
        {
            Respuesta oRespuesta = new Respuesta();
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    Warehouse oWarehouse = db.Warehouses.Find(oModel.Id);
                    oWarehouse.Category = oModel.Category;
                    db.Entry(oWarehouse).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
                    Warehouse oWarehouse = db.Warehouses.Find(Id);
                    db.Remove(oWarehouse);
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