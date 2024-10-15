namespace FabriceTools
{
    public class ConsolePrompt
    {
        static bool isOk;

        public static bool TryAgain ()
        {
            Console.WriteLine("Recommencer ? (Oui(o) / Non(n)");

            // Attendre que l'utilisateur appuie sur une touche
            ConsoleKey key = Console.ReadKey(true).Key;

            // Vérifie si l'utilisateur a appuyé sur 'o' ou 'n'
            return key == ConsoleKey.O;
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
    }
}
