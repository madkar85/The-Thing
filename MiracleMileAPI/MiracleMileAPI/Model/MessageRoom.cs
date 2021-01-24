using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiracleMileAPI.Model
{
    public class MessageRoom
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public DateTime Deleted { get; set; }
        public int CreatedByUSerId { get; set; }
        public bool Removed { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool PrivateMessageRoom { get; set; }
        public List<File> Files { get; set; }
    }
}
