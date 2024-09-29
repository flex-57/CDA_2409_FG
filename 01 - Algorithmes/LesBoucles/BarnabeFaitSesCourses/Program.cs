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
        static bool TryAgain()
        {
            string again;

            do
            {
                Console.WriteLine("Recommencer ? (Oui(o) / Non(n)");
                again = Console.ReadLine();
                again = again.ToLower();
            } while (again != "oui" && again != "o" && again != "non" && again != "n");

            return again == "oui" || again == "o";
        }

        static void Main(string[] args)
        {
            do
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
            while (TryAgain());
        }
    }
}
