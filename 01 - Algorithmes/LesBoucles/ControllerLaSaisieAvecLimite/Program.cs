internal class Program
{
    private static void Main(string[] args)
    {
        const string PASSWORD = "formation";
        const int MAX_ATTEMPTS = 3;

        string? passwordVerif;
        int remainingAttempts;
        int counter = 1;
        bool isOk;

        do
        {
            remainingAttempts = MAX_ATTEMPTS - counter;

            Console.WriteLine("Tapez votre mot de passe :");
            passwordVerif = Console.ReadLine();

            if (passwordVerif.Equals(PASSWORD))
            {
                Console.WriteLine($"{Environment.NewLine}Vous êtes connecté !");
                isOk = true;
            }

            else
            {
                if (remainingAttempts == 0)
                {
                    Console.WriteLine($"{Environment.NewLine}Votre compte est bloqué !");
                }

                else
                {
                    Console.WriteLine($"{Environment.NewLine}Mot de passe incorrect! Il vous reste {remainingAttempts} tentatives...");
                }

                Console.WriteLine(Environment.NewLine);
                counter++;
                isOk = false;
            }
        }
        while (remainingAttempts > 0 && !isOk);
    }
}