using FabriceTools;

namespace BarnabeFaitSesCourses
{
    internal class Program
    {
        static int SetAmount()
        {
            bool isOk;
            int amount;

            do
            {
                Console.WriteLine("Indiquez le montant de départ que possède Barnabé :");
                isOk = int.TryParse(Console.ReadLine(), out amount);

                if(!isOk || amount < 1)
                {
                    Console.WriteLine("Ce n'est pas une somme d'agent valide !");
                }
            }
            while (!isOk || amount < 1);

            return amount;
        }
     
        static void Count() 
        {
            int amount = SetAmount();
            int spent;
            int countStore = 0;

            while (amount > 0)
            {
                spent = amount / 2 + 1;
                amount = amount - spent;

                countStore++;

                string ord = countStore == 1 ? "er" : "e";

                Console.WriteLine($"Argent dépensé dans le {countStore}{ord} magasin : {spent}. Restant : {amount}");
            }

            Console.WriteLine($"Barnabé à visité {countStore} magasins et à dépensé tout son argent !");
        }
        static void Main(string[] args)
        {
            do
            {
                Count();
            }
            while (ConsolePrompt.TryAgain());
        }
    }
}
