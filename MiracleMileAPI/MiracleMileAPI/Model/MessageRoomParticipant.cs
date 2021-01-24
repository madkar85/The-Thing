using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiracleMileAPI.Model
{
    public class MessageRoomParticipant
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MessageRoomId { get; set; }
    }
}
