using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MiracleMileAPI.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MiracleMileAPI.Controllers
{
    [Route("miraclemile")]
    [ApiController]
    public class MessageController : ControllerBase
    {

        private readonly IWebHostEnvironment _hostingEnvironment;


        public MessageController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;

        }

        // PUT api/<MessageController>/5
        [HttpPost("getMessagesRoomUserIsIn")]
        public void GetMessagesRoomUserIsIn(int id, [FromBody] string value)
        {

            //GetAllMessagesRoomUserIsIn(int myUser, bool roomType)

        }

        // PUT api/<MessageController>/5
        [HttpPost("getAllMessagesRooms")]
        public void GetAllMessagesRooms(int id, [FromBody] string value)
        {

            //GetAllMessagesRooms(int myUser, bool roomType)

        }


        // PUT api/<MessageController>/5
        [HttpPost("getMessagesRoom")]
        public void GetMessagesRoom(int id, [FromBody] string value)
        {

            //GetMessagesRoom(int myUser, int messageRoomId)

        }

        // PUT api/<MessageController>/5
        [HttpPost("replyToMessage")]
        public void ReplyToMessage(int id, [FromBody] string value)
        {

            //ReplyToMessageRoom(int myUser, int messagRoomId, string messageName, string messageText)

        }

        // PUT api/<MessageController>/5
        [HttpPost("createPublicMessage")]
        public void CreatePublicMessage(int id, [FromBody] string value)
        {

            //CreatePublicMessageRoom(int myUser, string roomName, string roomDescription, string messageName, string messageText)

        }

        // PUT api/<MessageController>/5
        [HttpPost("createPrivateMessage")]
        public void CreatePrivateMessage(int id, [FromBody] string value)
        {

            //CreatePrivateMessageRoom(int myUser, int selectUser, string roomName, string roomDescription, string messageName, string messageText);

        }

        // PUT api/<MessageController>/5
        [HttpPost("messageRoomLike")]
        public void MessageRoomLike(int id, [FromBody] string value)
        {

            //AddAndRemoveMessageRoomLike(int Id, int myUser)

        }


        /*--------------------------- Message code  ------------------------------------------*/

        private  void AddAndRemoveMessageRoomLike(int Id, int myUser)
        {

            var likeJsonData = GetJsonData<Like>("Like");

            var like = likeJsonData.Where(u => u.Id == Id && u.UserId == myUser).First();

            if (String.IsNullOrEmpty(like.Id.ToString()))
            {
                var randomId = new Random();

                var newLike = new Like()
                {
                    Id = randomId.Next(),
                    UserId = myUser,
                    MessageRoomId = Id,
                    Created = DateTime.Now,
                    Active = true,

                };

                CheckAndAddDataToJson<Like>("Like", newLike);
            }
            else
            {
                if (like.Active)
                {
                    like.Active = false;
                }
                else
                {
                    like.Active = true;
                }

                CheckAndAddDataToJson("Like", like);
            }

        }


        private List<MessageRoom> GetMessagesRoom(int myUser, int messageRoomId)
        {

            var MessageRoomJsonData = GetJsonData<MessageRoom>("MessageRoom");

            MessageRoomJsonData.Where(u => u.Id == messageRoomId);

            List<MessageRoom> NewMessageRoomList = new List<MessageRoom>();


            if (CheckIfMessageRoomPrivate(messageRoomId))
            {
                if (CheckIfUserExistMessageRoom(myUser, messageRoomId))
                {
                    return MessageRoomJsonData;

                }
                else
                {
                    return null;
                }

            }
            else
            {


                return MessageRoomJsonData;


            }


        }

        private List<MessageRoom> GetAllMessagesRooms(int myUser, bool roomType)
        {



            var MessageRoomJsonData = GetJsonData<MessageRoom>("MessageRoom");

            List<MessageRoom> NewMessageRoomList = new List<MessageRoom>();

            foreach (var item in MessageRoomJsonData)
            {


                if (!item.PrivateMessageRoom)
                {

                    NewMessageRoomList.Add(item);

                }


            }

            return NewMessageRoomList;
        }

        private List<MessageRoom> GetAllMessagesRoomUserIsIn(int myUser, bool roomType)
        {

            var messageRoomParticipantJsonData = GetJsonData<MessageRoomParticipant>("MessageRoomParticipant");

            var messageRoomParticipantList = messageRoomParticipantJsonData.Where(u => u.UserId == myUser);

            var MessageRoomJsonData = GetJsonData<MessageRoom>("MessageRoom");

            List<MessageRoom> NewMessageRoomList = new List<MessageRoom>();

            foreach (var item in messageRoomParticipantList)
            {
                if (roomType && CheckIfMessageRoomPrivate(item.MessageRoomId))
                {

                    NewMessageRoomList.Add(MessageRoomJsonData.FirstOrDefault(u => u.Id == item.MessageRoomId));
                }

                if (!roomType && !CheckIfMessageRoomPrivate(item.MessageRoomId))
                {

                    NewMessageRoomList.Add(MessageRoomJsonData.FirstOrDefault(u => u.Id == item.MessageRoomId));

                }


            }

            return NewMessageRoomList;
        }

      

        private bool CheckJsonFileEmpty(string jsonName)
        {
            var contentRootPath = _hostingEnvironment.ContentRootPath;
            var file = $@"{contentRootPath}/JsonDB/" + jsonName + ".json";
            var FileData = System.IO.File.ReadAllText(file);
            if (FileData.Length == 0 || FileData == "{}")
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        private List<T> GetJsonData<T>(string jsonName)
        {
            var contentRootPath = _hostingEnvironment.ContentRootPath;
            var file = $@"{contentRootPath}/JsonDB/" + jsonName + ".json";
            var FileData = System.IO.File.ReadAllText(file);

            List<T> jsonObject = Newtonsoft.Json.JsonConvert.DeserializeObject<List<T>>(FileData);

            return jsonObject;
        }

        private void AddJsonData<T>(string jsonName, List<T> jsonList)
        {
            var contentRootPath = _hostingEnvironment.ContentRootPath;
            var jsonData = JsonConvert.SerializeObject(jsonList);
            //var contentRootPath = _hostingEnvironment.ContentRootPath;
            var file = $@"{contentRootPath}/JsonDB/" + jsonName + ".json";
            System.IO.File.WriteAllText(file, jsonData);
        }

        private void CheckAndAddDataToJson<T>(string jsonName, T newData)
        {
            List<T> JsonData = new List<T>();

            if (!CheckJsonFileEmpty(jsonName))
            {
                JsonData = GetJsonData<T>(jsonName);

                JsonData.Add(newData);

            }
            else
            {
                JsonData.Add(newData);
            }

            AddJsonData<T>(jsonName, JsonData);

        }

        private void CreatePublicMessageRoom(int myUser, string roomName, string roomDescription, string messageName, string messageText)
        {


            int newMessagRoomId = CreateMessagRoom(myUser, roomName, roomDescription);


            CreateMessageRoomParticipant(myUser, newMessagRoomId);


            CreateMessages(myUser, newMessagRoomId, messageName, messageText);

        }

        private int CreateMessagRoom(int myUser, string roomName, string roomDescription)
        {

            var randomId = new Random();

            var newMessagRoom = new MessageRoom()
            {
                Id = randomId.Next(),
                CreatedByUSerId = myUser,
                Name = roomName,
                Created = DateTime.Now,
                Description = roomDescription,
                PrivateMessageRoom = false,
            };

            CheckAndAddDataToJson<MessageRoom>("MessageRoom", newMessagRoom);

            return newMessagRoom.Id;

        }

        private void CreateMessageRoomParticipant(int myUser, int messagRoomId)
        {

            var randomId = new Random();

            var newMessageRoomParticipant = new MessageRoomParticipant()
            {
                Id = randomId.Next(),
                MessageRoomId = messagRoomId,
                UserId = myUser,
            };



            CheckAndAddDataToJson<MessageRoomParticipant>("MessageRoomParticipant", newMessageRoomParticipant);

        }

        private void CreateMessages(int myUser, int messagRoomId, string messageName, string messageText)
        {

            var randomId = new Random();


            var newMessage = new Message()
            {
                Id = randomId.Next(),
                MessageRoomId = messagRoomId,
                UserId = myUser,
                Name = messageName,
                Created = DateTime.Now,
                Text = messageText,
            };

            CheckAndAddDataToJson<Message>("Message", newMessage);

        }

        private void ReplyToMessageRoom(int myUser, int messagRoomId, string messageName, string messageText)
        {

            /*if (CheckIfMessageRoomPrivate(myUser, messagRoomId))
            {
                if (CheckIfUserExistMessageRoom(myUser, messagRoomId))
                {
                    CreateMessages(myUser, messagRoomId, messageName, messageText);
                }

            }
            else
            {

                if (!CheckIfUserExistMessageRoom(myUser, messagRoomId))
                {
                    CreateMessageRoomParticipant(myUser, messagRoomId);
                }

                CreateMessages(myUser, messagRoomId, messageName, messageText);

            }*/



        }

        private bool CheckIfUserExistMessageRoom(int myUser, int messagRoomId)
        {
            var userCanReply = false;

            var messageRoomParticipantJsonData = GetJsonData<MessageRoomParticipant>("MessageRoomParticipant");

            var messageRoomParticipant = messageRoomParticipantJsonData.Where(u => u.UserId == myUser && u.MessageRoomId == messagRoomId).First();

            if (messageRoomParticipant.UserId != null)
            {
                userCanReply = true;
            }
            else
            {
                userCanReply = false;
            }

            return userCanReply;
        }

        private bool CheckIfMessageRoomPrivate(int messagRoomId)
        {
            var userCanReply = false;


            var messageRoomJsonData = GetJsonData<MessageRoom>("MessageRoom");

            var messageRoom = messageRoomJsonData.Where(u => u.Id == messagRoomId).First();

            if (messageRoom.PrivateMessageRoom)
            {
                userCanReply = true;
            }
            else
            {

                userCanReply = false;
            }

            return userCanReply;
        }
        private void CreatePrivateMessageRoom(int myUser, int selectUser, string roomName, string roomDescription, string messageName, string messageText)
        {

            int newMessagRoomId = CreateMessagRoom(myUser, roomName, roomDescription);

            CreateMessageRoomParticipant(myUser, newMessagRoomId);

            CreateMessageRoomParticipant(selectUser, newMessagRoomId);

            CreateMessages(myUser, newMessagRoomId, messageName, messageText);

        }

    }
}
