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
                List<string[]> users = new List<string[]>();
                string inputName;
                string inputBirthday;
                string inputInfosUser = "";
                TimeSpan Birthday;
                DateTime Now = DateTime.Now;
                DateTime d;
                int years = 0;
                int months = 0;
                int days = 0;
                bool isMajor = true;
                bool isNameOk;
                bool isDateOk;
                int i = 1;

                do
                {
                    do
                    {
                        Regex reg = new Regex(@"^[a-zàâéèëêïîôöùüûçñ -]+$", RegexOptions.IgnoreCase);

                        Console.Write("Entrez nom et prénom : ");
                        inputName = Console.ReadLine() ?? "";
                    
                        isNameOk = reg.IsMatch(inputName);

                        if(!isNameOk)
                        {
                            Console.WriteLine("Ce n'est pas un nom valide !");
                        }
                    }
                    while (!isNameOk);

                    do
                    {
                        Console.Write("Entrez date de naissance (dd-mm-yyyy) : ");
                        inputBirthday = Console.ReadLine() ?? "";

                        isDateOk = DateTime.TryParse(inputBirthday, out d);

                        if (!isDateOk)
                        {
                            Console.WriteLine("La date fournie n'est pas au bon format !");
                        }

                        else
                        {
                            /*
                            Birthday = Now - d;
                            years = (int)(Birthday.Days / 365.25);
                            decimals = Birthday.Days / 365.25 - years;
                            months = (int)(12 * decimals);
                            */
                            years = Now.Year - d.Year;

                            if(Now < d.AddYears(years))
                            {
                                years--;
                            }

                            months = Now.Month - d.Month;

                            if(months < 0)
                            {
                                months += 12;
                            }

                            days = (Now - d.AddYears(years).AddMonths(months)).Days;
                        }
                    }
                    while (!isDateOk);

                    if(years < 0)
                    {
                        Console.WriteLine("L'utilisateur n'est pas encore conçu !! :D");
                    }

                    else
                    {
                        if (years >= 18)
                        {
                            Console.Write("Entrez métier : ");
                            inputInfosUser = Console.ReadLine() ?? "";
                            isMajor = true;
                        }

                        else
                        {
                            Console.Write("Entrez couleur préférée :");
                            inputInfosUser = Console.ReadLine() ?? "";
                            isMajor = false;
                        }

                        string[] user = new string[3];

                        user[0] = $"Nom et prénom : {inputName}";
                        user[1] = $"Date de naissance : {d.ToShortDateString()} / Age : {years} ans, {months} mois et {days} jours.";
                        user[2] = isMajor ? $"Métier : {inputInfosUser}" : $"Couleur préférée : {inputInfosUser}";

                        users.Add(user);
                    }


                }
                while (WantToAddUser());

                if(users.Count < 1)
                {
                    Console.WriteLine("Il n'y a aucun utilisateur !");
                }
                else
                {
                    string suffixe = users.Count <= 1 ? "" : "s";
                    Console.WriteLine($"{Environment.NewLine}Il y a {users.Count} utilisateur{suffixe} :");
                }                   

                foreach (string[] user_ in users)
                {
                    Console.WriteLine($"Utilisateur {i++} : ");
                
                    foreach(string u in user_)
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
