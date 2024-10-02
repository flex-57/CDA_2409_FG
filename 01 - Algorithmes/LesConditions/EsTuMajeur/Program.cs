using FabriceTools;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        do
        {
            Console.Write("Veuillez entrer votre âge : ");
            string input = Console.ReadLine();

            try
            {
                // Vérifie si l'entrée correspond à une expression régulière pour un nombre entier
                if (Regex.IsMatch(input, @"^(-?\d+)$"))
                {
                    int age = int.Parse(input);

                    if (age <= 0)
                    {
                        Console.WriteLine("Vous n'êtes pas encore né(e) !");
                    }
                    else if (age < 18)
                    {
                        Console.WriteLine("Vous êtes mineur(e).");
                    }
                    else if (age < 130)
                    {
                        Console.WriteLine("Vous êtes majeur(e).");
                    }
                    else
                    {
                        Console.WriteLine("Vous êtes mort(e) !");
                    }
                }
                else
                {
                    throw new FormatException("Format incorrect : veuillez entrer un âge valide.");
                }
            }
            catch (FormatException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur : {ex.Message}");
            }
        }
        while (ConsolePrompt.TryAgain());
    }
}
