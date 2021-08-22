using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MiracleMileAPI.Library
{
    public class WorkWithJsonFile
    {

        private string _contentRootPath;


        public WorkWithJsonFile(string contentRootPath)
        {
            _contentRootPath = contentRootPath;

        }
        public bool CheckJsonFileEmpty(string jsonName)
        {
            var contentRootPath = _contentRootPath;
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

        public List<T> GetJsonData<T>(string jsonName)
        {
            var contentRootPath = _contentRootPath;
            var file = $@"{contentRootPath}/JsonDB/" + jsonName + ".json";
            var FileData = System.IO.File.ReadAllText(file);

            List<T> jsonObject = Newtonsoft.Json.JsonConvert.DeserializeObject<List<T>>(FileData);

            return jsonObject;
        }

        public void AddJsonData<T>(string jsonName, List<T> jsonList)
        {
            var contentRootPath = _contentRootPath;
            var jsonData = JsonConvert.SerializeObject(jsonList);
            //var contentRootPath = _hostingEnvironment.ContentRootPath;
            var file = $@"{contentRootPath}/JsonDB/" + jsonName + ".json";
            System.IO.File.WriteAllText(file, jsonData);
        }

        public void CheckAndAddDataToJson<T>(string jsonName, T newData)
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
    }
}
