using FabriceTools;
using System.Formats.Tar;

namespace Palindrome
{
    internal class Program
    {
        
        static void Main(string[] args)
        {
            string text;
            do
            {
                Console.WriteLine("veuillez saisir une phrase ou un mot pour vérifier s'il s'agit d'un palindrome :");
                text = Console.ReadLine();

                if (text.Length > 0 && text.Substring(text.Length - 1, 1) != ".")
                {
                    
                }



            }
            while (ConsolePrompt.TryAgain());
        }
    }
}
