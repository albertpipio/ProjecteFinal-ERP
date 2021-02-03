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
    public class ClientController : ControllerBase
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
                    var lst = db.Clients.OrderByDescending(d => d.Id).ToList();
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
        public IActionResult Add(ClientRequest oModel)
        {
            Respuesta oRespuesta = new Respuesta();
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    Client oClient = new Client();
                    oClient.Name = oModel.Name;
                    oClient.Email = oModel.Email;
                    oClient.Cif = oModel.Cif;
                    oClient.Address = oModel.Address;
                    oClient.Phone = oModel.Phone;
                    oClient.CompletedOrders = oModel.CompletedOrders;
                    db.Clients.Add(oClient);
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
        public IActionResult Edit(ClientRequest oModel)
        {
            Respuesta oRespuesta = new Respuesta();
            try
            {
                using (ERPContext db = new ERPContext())
                {
                    Client oClient = db.Clients.Find(oModel.Id);
                    oClient.Name = oModel.Name;
                    oClient.Email = oModel.Email;
                    oClient.Cif = oModel.Cif;
                    oClient.Address = oModel.Address;
                    oClient.Phone = oModel.Phone;
                    oClient.CompletedOrders = oModel.CompletedOrders;
                    db.Entry(oClient).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
                    Client oClient = db.Clients.Find(Id);
                    db.Remove(oClient);
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