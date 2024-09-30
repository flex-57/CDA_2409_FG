namespace FabriceTools
{
    public class ConsolePrompt
    {
        public static bool TryAgain()
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
    }
}
