using Microsoft.AspNetCore.Hosting;
using MiracleMileAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiracleMileAPI.Library
{
    public class MapCrud
    {
      
        private WorkWithJsonFile workWithJsonFile;

        public MapCrud(string contentRootPath)
        {
           
            workWithJsonFile = new WorkWithJsonFile(contentRootPath);

        }

        public List<MapMarker> GetMapMarkers()
        {
           
            List<MapMarker> jsonObject = workWithJsonFile.GetJsonData<MapMarker>("MapMarker");
            return jsonObject;
        }

        public List<Like> GetLikes()
        {

            List<Like> jsonObject = workWithJsonFile.GetJsonData<Like>("Like");
            return jsonObject;
        }

        public int GetMapMarkerLike(int id, int type)
        {

            TypeOfLike typeOfLike = (TypeOfLike)type;

            List<Like> jsonObject = GetLikes();

            var numberOfLike = jsonObject.FindAll(x => x.ObjectId == id && x.Type == typeOfLike).Count;

            return numberOfLike;
        }



        public int MapTest()
        {
            int id = 3;


            int type = 2;

            TypeOfLike typeOfLike = (TypeOfLike)type;

            List<Like> jsonObject = GetLikes();

            var numberOfLike = jsonObject.FindAll(x => x.ObjectId == id && x.Type == typeOfLike).Count;

            return numberOfLike;
        }


    }
}
