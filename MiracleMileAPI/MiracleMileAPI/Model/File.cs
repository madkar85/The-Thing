using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiracleMileAPI.Model
{
    public class File
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Deleted { get; set; }
        public bool Removed { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
    }
}
