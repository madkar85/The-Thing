using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiracleMileAPI.Model
{
    public class MapMarker
    {
        public int Id { get; set; }
        public double Longitud { get; set; }
        public double Latitud { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
