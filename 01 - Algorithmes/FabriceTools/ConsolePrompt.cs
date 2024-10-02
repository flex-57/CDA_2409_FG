namespace FabriceTools
{
    public class ConsolePrompt
    {
        public static bool TryAgain()
        {
            Console.WriteLine("Recommencer ? (Oui(o) / Non(n)");

            // Attendre que l'utilisateur appuie sur une touche
            ConsoleKeyInfo key = Console.ReadKey();

            // Vérifie si l'utilisateur a appuyé sur 'o' ou 'n'
            return key.KeyChar == 'o' || key.KeyChar == 'O';
        }
    }
}
