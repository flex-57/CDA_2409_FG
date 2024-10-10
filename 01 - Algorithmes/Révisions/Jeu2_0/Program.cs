using FabriceTools;

namespace Jeu2_0
{
    internal class Program
    {
        static void Main(string[] args)
        {
            do
            {
                int computerScore = 0;
                int playerScore = 0;
                bool stop = false;

                do
                {
                    int computerN = new Random().Next(3);
                    int playerN;
                    bool isOk;

                    do
                    {
                        Console.WriteLine("Veuillez choisir un nombre parmi 0, 1 et 2 (ou un nombre négatif pour terminer) :");
                        isOk = int.TryParse(Console.ReadLine(), out playerN) && playerN <= 2;

                        if (!isOk)
                        {
                            Console.WriteLine("Vous devez choisir un nombre entre 0 et 2 !");
                        }

                        else
                        {
                            if (playerN >= 0)
                            {
                                Console.Write($"L'ordinateur a choisi le nombre \"{computerN}\"{Environment.NewLine}");

                                Console.WriteLine($"Vous avez choisi le nombre \"{playerN}\"{Environment.NewLine}");

                                string greater = playerN < computerN ? "Ordi" : "Humain";

                                if (Math.Abs(playerN - computerN) == 2)
                                {
                                    if (greater == "Ordi")
                                    {
                                        computerScore++;
                                    }
                                    else
                                    {
                                        playerScore++;
                                    }
                                }

                                else if (Math.Abs(playerN - computerN) == 1)
                                {
                                    if (greater == "Ordi")
                                    {
                                        playerScore++;
                                    }
                                    else
                                    {
                                        computerScore++;
                                    }
                                }
                            }

                            else
                            {
                                stop = true;
                            }
                        }
                        Console.WriteLine($"Scores :{Environment.NewLine}Ordi : {computerScore}  |  Humain : {playerScore}{Environment.NewLine}");
                    }
                    while (!isOk);
                }
                while (computerScore < 10 && playerScore < 10 && !stop);
            }
            while (ConsolePrompt.TryAgain());
        }
    }
}
