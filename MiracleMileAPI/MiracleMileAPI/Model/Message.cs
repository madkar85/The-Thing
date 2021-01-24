using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiracleMileAPI.Model
{
    public class Message
    {
        public int Id { get; set; }
        public int MessageRoomId { get; set; }
        public int UserId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public DateTime Deleted { get; set; }
        public bool Removed { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public List<File> Files { get; set; }
    }
}
