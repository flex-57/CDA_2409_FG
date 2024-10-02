using FabriceTools;

namespace Jeu2_0
{
    internal class Program
    {
        static void Main(string[] args)
        {
            do
            {
                int computeurN = new Random().Next(3);
                int playerN;
                int computeurScore = 0;
                int playerScore = 0;
                bool isOk;

                do
                {
                    Console.WriteLine("Veuillez choisir un nombre parmi 0, 1 ou 2 (nombre négatif pour terminer) :");
                    isOk = int.TryParse(Console.ReadLine(), out playerN) && playerN <= 2;

                    if(!isOk)
                    {
                        Console.WriteLine("Vous devez choisir un nombre entre 0 et 2 !");
                    }

                    else
                    {
                        if (playerN >= 0)
                        {
                            Console.Write($"L'ordinateur a choisi le nombre \"{computeurN}\" {Environment.NewLine}");

                            int diff = p
                            if()
                        }
                    }
                }
                while (!isOk);



            }
            while (ConsolePrompt.TryAgain());
        }
    }
}
