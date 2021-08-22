using IronPython.Modules;
using Microsoft.AspNetCore.Hosting;
using MiracleMileAPI.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MiracleMileAPI.Library
{
    public class AnimalCrud
    {
        private WorkWithJsonFile workWithJsonFile;

        public AnimalCrud(string contentRootPath)
        {

            workWithJsonFile = new WorkWithJsonFile(contentRootPath);

        }

        public List<Animal> GetAnimals()
        {
            List<Animal> jsonObject = workWithJsonFile.GetJsonData<Animal>("Animal");
            return jsonObject;
        }
        public List<Animal> GetAnimalsByOwnerId(int ownerId)
        {
            var animales = GetAnimals().ToList();
            var animalesByOwnerId = animales.Where(x => x.OwnerId == ownerId);
            return animalesByOwnerId.ToList(); ;

        }
        public Animal GetAnimalById(int Id)
        {
            var animales = GetAnimals().ToList();
            var animalesByOwnerId = animales.Where(x => x.Id == Id).FirstOrDefault();
            return animalesByOwnerId;

        }
        public Animal CreateAnimal(Animal animal)
        {
            animal.Id = Guid.NewGuid().GetHashCode();

            List<Animal> jsonList = GetAnimals().ToList();

            jsonList.Add(animal);

            workWithJsonFile.AddJsonData<Animal>("Animal", jsonList);

            return animal;
        }

        public Animal UpdateAnimal(Animal animal)
        {
            //animal.Id = Guid.NewGuid().GetHashCode();
            var animales = GetAnimals().ToList();
            animales.Where(S => S.Id == animal.Id)
              .Select(S =>
              {
                  S.Photo = animal.Photo;
                  S.Certificate = animal.Certificate;
                  S.DateOfBirth = animal.DateOfBirth;
                  S.Name = animal.Name;
                  S.Type = animal.Type;
                  S.Breed = animal.Breed;
                  S.Size = animal.Size;
                  S.Description = animal.Description;
                  S.OwnerId = animal.OwnerId;
                  return S;
              }).ToList();

            workWithJsonFile.AddJsonData<Animal>("Animal", animales);

            return animal;
        }
        public void DeleteAnimal(int id)
        {
            try
            {
                var animales = GetAnimals().ToList();
                animales.RemoveAll(x => x.Id == id);

                workWithJsonFile.AddJsonData<Animal>("Animal", animales);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }

}

