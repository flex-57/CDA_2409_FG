using FabriceTools;

namespace Validations
{
    public class IsValid
    {
        static string prompt;
        static bool isOk;

        public static void ValidCreditCard()
        {
            do
            {
                Console.WriteLine("Entrez un numéro de CB : ");
                prompt = Console.ReadLine() ?? "";

                isOk = RegexCheck.creditCard(prompt) && CBCheck.algoLuhn(prompt);

                if (!isOk)
                {
                    Console.WriteLine($"\"{prompt}\" n'est pas un numéro de carte de crédit valide !");
                }

                else
                {
                    Console.WriteLine("Numéro de carte de crédit valide, nous espérons que celle-ci est pleine !");
                }
            }
            while (!isOk);
        }

        public static void ValidTelephoneNumber()
        {
            do
            {
                Console.WriteLine("Entrez votre numéro de téléphone :");
                prompt = Console.ReadLine() ?? "";

                isOk = RegexCheck.telephoneNumber(prompt);

                if (!isOk)
                {
                    Console.WriteLine($"\"{prompt}\" n'est pas un numéro de téléphone valide !");
                }

                else
                {
                    Console.WriteLine("C'est bon!");
                }
            }
            while (!isOk);
        }

        public static void ValidPassword()
        {
            do
            {
                Console.WriteLine("Entrez un mot de passe : ");
                Console.WriteLine("(12 caractères minimum, au moins une minuscule, une majuscule, un chiffre et un caractère spécial ou ");
                Console.WriteLine("20 caractères minimum, au moins une minuscule, une majuscule et un chiffre)");
                prompt = Console.ReadLine() ?? "";

                isOk = RegexCheck.password(prompt);

                if (!isOk)
                {
                    Console.WriteLine($"Le mot de passe \"{prompt}\" n'est pas valide !");
                }

                else
                {
                    Console.WriteLine("C'est bon!");
                }
            }
            while (!isOk);
        }
    }
}
