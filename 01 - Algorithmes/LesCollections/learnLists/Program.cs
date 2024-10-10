using FabriceTools;
namespace LearnLists
{
    internal class Program
    {
        static void Main(string[] args)
        {
            do
            {
                string inputName;
                List<string> usernames = new List<string>();
                int i = 1;

                do
                {
                    Console.Write("Entrez nom et prénom :");
                    inputName = Console.ReadLine() ?? "";

                    usernames.Add(inputName);
                }
                while (WantToAddUser());

                string suffixe = usernames.Count == 1 ? "" : "s";
                Console.WriteLine($"Il y a {usernames.Count} utilisateur{suffixe} :");

                foreach (string name in usernames)
                {
                    Console.WriteLine($"{i}. {name}");
                }
            }
            while (ConsolePrompt.TryAgain());
        }

        static bool WantToAddUser()
        {
            Console.WriteLine("Voulez-vous ajouter une autre personne (o/n) ? ");

            ConsoleKeyInfo key = Console.ReadKey(true);

            return key.KeyChar == 'o' || key.KeyChar == 'O';
        }
    }
}
