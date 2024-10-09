using FabriceTools;

namespace Jalon
{
    internal class Program
    {
        const int MEAT_PRICE = 4;
        static string userName;
        static int money;
        static Card card = new Card();

        public bool Rechargez()
        {
            char key = Console.ReadKey(true).KeyChar;

            return key == 'o';
        }

        static void Main(string[] args)
        {
            string[] users = [
                "Premier",
                "Deuxieme",
                "Troisieme",
                "Quatrieme",
                "Cinquieme"
            ];

            do
            {
                bool isOk;
                do
                {
                    Console.WriteLine("Quel est votre nom ?");
                    userName = Console.ReadLine() ?? " ";

                    isOk = users.Contains(userName);

                    if (!isOk)
                    {
                        Console.WriteLine($"L'utilisateur \"{userName}\" n'existe pas !");
                    }

                    else
                    {
                        card.user = userName;
                        Console.WriteLine($"Bonjour {userName}");
                    }
                }
                while (!isOk);

                do
                {
                    Console.WriteLine($"Fonds insuffisants ! Il n'y a que {card.fonds} euro(s) sur votre carte !");
                    Console.WriteLine("Alimenter votre carte :");

                    if (int.TryParse(Console.ReadLine(), out money))
                    {
                        card.alimenterCard(money);

                        if (card.fonds < MEAT_PRICE)
                        {
                            Console.WriteLine("Il n'ya pas assez d'argent pour un repas !");
                        }
                        else
                        {
                            Console.WriteLine($"Votre carte est rechargée et contient {card.fonds} euro(s).");
                            
                            Console.WriteLine($"Après payement de votre repas, il vous reste {card.Payer(MEAT_PRICE)} euro(s).");
                        }
                    }
                }
                while (card.fonds < MEAT_PRICE);
            }
            while (ConsolePrompt.TryAgain());
        }
    }
}
