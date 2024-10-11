using FabriceTools;
using System;
using System.Text.RegularExpressions;
using static System.Runtime.InteropServices.JavaScript.JSType;
namespace LearnLists
{
    internal class Program
    {
        static void Main(string[] args)
        {
            do
            {
                string inputName;
                string inputBirthday;
                string inputInfosUser = "";
                List<string[]> users = new List<string[]>();
                TimeSpan Birthday;
                DateTime Now = DateTime.Now;
                int age = 0;
                bool isMajor = true;
                bool isNameOk;
                int i = 1;

                do
                {
                    do
                    {
                        Regex reg = new Regex(@"[a-zA-Z -]{2,40}");

                        Console.Write("Entrez nom et prénom : ");
                        inputName = Console.ReadLine() ?? "";
                    
                        isNameOk = reg.IsMatch(inputName);

                        if(!isNameOk)
                        {
                            Console.WriteLine("Ce n'est pas un nom valid");
                        }
                    }
                    while (!isNameOk);


                    Console.Write("Entrez date de naissance (dd-mm-yyyy) : ");
                    inputBirthday = Console.ReadLine() ?? "";

                    if (!DateTime.TryParse(inputBirthday, out DateTime d))
                    {
                        Console.WriteLine("La date fournie n'est pas au bon format");
                    }

                    else
                    {
                        Birthday = Now - d;
                        age = (int)(Birthday.Days / 365.25);
                    }

                    if (age >= 18)
                    {
                        Console.Write("Entrez métier : ");
                        inputInfosUser = Console.ReadLine() ?? "";
                        isMajor = true;
                    }

                    else if (age > 0)
                    {
                        Console.Write("Entrez couleur préférée :");
                        inputInfosUser = Console.ReadLine() ?? "";
                        isMajor = false;
                    }

                    else
                    {
                        Console.WriteLine("Vous n'existez même pas !!");
                    }


                    string[] user = new string[3];

                    user[0] = $"Nom et prénon : {inputName}";
                    user[1] = $"Age : {age} ans";
                    user[2] = isMajor ? $"Métier : {inputInfosUser}" : $"Couleur préférée : {inputInfosUser}";

                    users.Add(user);
                }
                while (WantToAddUser());

                string suffixe = users.Count == 1 ? "" : "s";
                Console.WriteLine($"{Environment.NewLine}Il y a {users.Count} utilisateur{suffixe} :");

                foreach (string[] u_ in users)
                {
                    Console.WriteLine($"Utilisateur {i++} : ");
                
                    foreach(string u in u_)
                    {
                        Console.WriteLine($"\t{u}");
                    }
                }
            }
            while (ConsolePrompt.TryAgain());
        }

        static bool WantToAddUser()
        {
            Console.WriteLine("Voulez-vous ajouter une autre personne (o/n) ? ");

            ConsoleKeyInfo key = Console.ReadKey(true);

            return key.KeyChar == 'o' || key.KeyChar == 'O';
        }
    }
}
