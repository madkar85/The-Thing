using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiracleMileAPI.Library;
using MiracleMileAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiracleMileAPI.Controllers
{
    [Route("miraclemile")]
    [ApiController]
    public class MapController : Controller
    {

        
        private MapCrud mapCrud;

        public MapController(IWebHostEnvironment hostingEnvironment)
        {
            
            mapCrud = new MapCrud(hostingEnvironment.ContentRootPath);

        }

        [HttpGet("getMapMarkers")]
        public List<MapMarker> GetMapMarkers()
        {
            
            return mapCrud.GetMapMarkers();
      
        }

        [HttpGet("getMapMarkerLike")]
        public int GetMapMarkerLike(MapMarker mapMarker)
        {

            return mapCrud.GetMapMarkerLike(mapMarker.Id);

        }

        // POST: MapController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
