namespace FabriceTools
{
    public class ConsolePrompt
    {
        static bool isOk;

        public static bool TryAgain ()
        {
            Console.WriteLine("Recommencer ? (Oui(o) / Non(n)");

            // Attendre que l'utilisateur appuie sur une touche
            ConsoleKeyInfo key = Console.ReadKey(true);

            // Vérifie si l'utilisateur a appuyé sur 'o' ou 'n'
            return key.KeyChar == 'o' || key.KeyChar == 'O';
        }

        public static int AskInteger (string _question)
        {
            string prompt;
            int returnValue;

            do
            {
                Console.WriteLine(_question);
                prompt = Console.ReadLine() ?? "";

                isOk = int.TryParse(prompt, out returnValue);

                if (!isOk)
                {
                    Console.WriteLine("Saisie invalide, recommencez !");
                }
            }
            while (!isOk);

            return returnValue;
        }

        public static float AskPositiveFloat (string _question)
        {
            string prompt;
            float returnValue;

            do
            {
                Console.WriteLine(_question);
                prompt = Console.ReadLine() ?? "";

                isOk = float.TryParse(prompt, out returnValue) && returnValue >= 0;

                if (!isOk)
                {
                    Console.WriteLine("Saisie invalide, recommencez !");
                }
            }
            while (!isOk);

            return returnValue;
        }


        public static void telephoneNumberCheck()
        {
            string prompt;

            do
            {
                Console.WriteLine("Entrez un numéro de téléphone : ");
                prompt = Console.ReadLine() ?? "";

                isOk = RegexCheck.telephoneNumber(prompt);

                if (!isOk)
                {
                    Console.WriteLine("Numéro de téléphone invalide, recommencez !");
                }

                else
                {
                    Console.WriteLine("Numéro de téléphone valide, merci !");
                }
            }
            while (!isOk);
        }

        public static void passwordCheck()
        {
            string prompt;

            do
            {
                Console.WriteLine("Entrez un mot de passe : ");
                Console.WriteLine("(12 caractères minimum, au moins une minuscule, une majuscule, un chiffre et un caractère spécial ou ");
                Console.WriteLine("20 caractères minimum, au moins une minuscule, une majuscule et un chiffre)");
                prompt = Console.ReadLine() ?? "";

                isOk = RegexCheck.password(prompt);

                if (!isOk)
                {
                    Console.WriteLine("Mot de passe invalide, recommencez !");
                }

                else
                {
                    Console.WriteLine("Mot de passe valide, continuez !");
                }
            }
            while (!isOk);
        }
    }
}
