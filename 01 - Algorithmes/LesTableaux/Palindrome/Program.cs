using FabriceTools;

namespace Palindrome
{
    internal class Program
    {
        static void Main(string[] args)
        {
            bool isOk = false;
            string input;

            do
            {
                do
                {
                    Console.WriteLine("Entrez un mot ou une phrase terminée par un point :");
                    input = Console.ReadLine();

                    isOk = !string.IsNullOrWhiteSpace(input) && input.EndsWith('.');

                    if (!isOk)
                    {
                        Console.WriteLine("La phrase doit se terminer par un point et ne doit pas être vide.");
                    }

                    else if (input == ".")
                    {
                        Console.WriteLine("La phrase est vide, veuillez entrer une phrase valide.");
                        isOk = false;
                    }

                    if (isOk)
                    {
                        string textNoDot = input.Substring(0, input.Length - 1).Replace(" ", "").ToLower();

                        if (textNoDot.Length == 0)
                        {
                            Console.WriteLine("La phrase est vide après nettoyage.");
                        }

                        else if (IsPalindrome(textNoDot))
                        {
                            Console.WriteLine("C'est un palindrome !");
                        }

                        else
                        {
                            Console.WriteLine("Ce n'est pas un palindrome.");
                        }
                    }

                } while (!isOk || input == ".");

            } while (ConsolePrompt.TryAgain());
        }

        static bool IsPalindrome(string str)
        {
            int left = 0;
            int right = str.Length - 1;

            while (left < right)
            {
                if (str[left] != str[right])
                {
                    return false;
                }

                left++;
                right--;
            }

            return true;
        }
    }
}
