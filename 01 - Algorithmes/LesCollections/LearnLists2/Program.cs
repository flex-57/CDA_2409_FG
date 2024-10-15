using FabriceTools;
using System.Text.RegularExpressions;
namespace LearnLists
{
    internal class Program
    {
        const int USER_MAX_LENGHT = 6;
        static void Main(string[] args)
        {
            do
            {
                List<string[]> users = [];
                string inputName;
                string inputBirthday;
                string? inputInfosUser = null;
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

                        if (!isNameOk)
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
                            years = Now.Year - d.Year;

                            if (Now < d.AddYears(years))
                            {
                                years--;
                            }

                            months = Now.Month - d.Month;

                            if (months < 0)
                            {
                                months += 12;
                            }

                            days = (Now - d.AddYears(years).AddMonths(months)).Days;

                            if (days < 0)
                            {
                                months--;
                                days = DateTime.DaysInMonth(d.Year, d.Month) + days;
                            }
                        }
                    }
                    while (!isDateOk);

                    if (years > 0)
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

                        string[] user = new string[USER_MAX_LENGHT];

                        user[0] = inputName;
                        user[1] = d.ToShortDateString();
                        user[2] = years.ToString();
                        user[3] = months.ToString();
                        user[4] = days.ToString();
                        user[5] = inputInfosUser;

                        users.Add(user);
                    }

                    else
                    {
                        Console.WriteLine("L'utilisateur n'est pas encore conçu !! :D");
                    }
                }
                while (WantToAddUser());

                if (users.Count < 1)
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

                    Console.WriteLine($"\tNom et prénom : {user_[0]}");
                    Console.WriteLine($"\tDate de naissance : {user_[1]} / Age : {user_[2]} ans, {user_[3]} mois et {user_[4]} jours");
                    Console.WriteLine(isMajor ? $"\tMétier : {user_[5]}" : $"\tCouleur préférée : {user_[5]}");

                    /*
                    foreach (string u in user_)
                    {
                        Console.WriteLine($"\t{u}");
                    }
                    */
                }
            }
            while (ConsolePrompt.TryAgain());
        }

        static bool WantToAddUser()
        {
            Console.WriteLine("Voulez-vous ajouter une autre personne (o/n) ? ");

            ConsoleKey key = Console.ReadKey(true).Key;

            return key == ConsoleKey.O;
        }
    }
}
