using FabriceTools;

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

        static void Main(string[] args)
        {
            string text;

            char[] chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            int[] counter = new int[chars.Length];
            string res = "";

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

                Console.WriteLine($"Dans ce texte de {text.Length} caractères ");

                for (int position = 0; position < chars.Length; position++)
                {
                    if (counter[position] > 0)
                    {
                        res += $"le \"{chars[position]}\" apparait {counter[position]} fois,{Environment.NewLine}";
                    }
                }
                res = res.Substring(0, res.Length - 3) + '.';

                Console.WriteLine(res);
            }
            while (ConsolePrompt.TryAgain());
        }
    }
}