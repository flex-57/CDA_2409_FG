using System.Diagnostics;

namespace DénombrerLettres
{
    internal class Program
    {
        static string SetText()
        {
            string text = " ";
            bool isOk = false;

            while (!isOk)
            {
                Console.WriteLine("Veuillez taper votre texte (au moins 120 caractères) :");
                text = Console.ReadLine();

                if (text.Length < 120)
                {
                    Console.WriteLine("La taille du texte doit être supérieur à 120 caratères !");
                }

                else
                {
                    isOk = true;
                }
            }
            return text != " " ? text.ToLower() : " ";
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
            string text;

            char[] chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            int[] counter = new int[chars.Length];

            do
            {
                text = SetText();

                foreach (char c in text)
                {
                    int pos = Array.IndexOf(chars, c);

                    if(pos > -1)
                    {
                        counter[pos]++;
                    }
                }

                for (int position = 0; position < chars.Length; position++)
                {
                    if(counter[position] > 0)
                    {
                        Console.WriteLine($"{chars[position]} : {counter[position]}");
                    }
                }
            }
            while (TryAgain());
        }
    }
}