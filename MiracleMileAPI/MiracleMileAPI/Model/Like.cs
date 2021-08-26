using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiracleMileAPI.Model
{
    public class Like
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ObjectId { get; set; }
        public TypeOfLike Type { get; set; }
        public bool Active { get; set; }
        public DateTime Created { get; set; }
    }
}
