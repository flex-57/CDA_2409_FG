using FabriceTools;

namespace Validations
{
    public class IsValid
    {
        static string prompt = "";

        public static void ValidCreditCard()
        {
            Console.WriteLine("Entrez un numéro de CB : ");
            prompt = Console.ReadLine() ?? "";

            if (!RegexCheck.creditCard(prompt) && CBCheck.algoLuhn(prompt))
            {
                Console.WriteLine($"\"{prompt}\" n'est pas un numéro de carte de crédit valide !");
            }

            else
            {
                Console.WriteLine("Numéro de carte de crédit valide, nous espérons que celle-ci est pleine !");
            }
        }

        public static void ValidTelephoneNumber()
        {
            Console.WriteLine("Entrez votre numéro de téléphone :");
            prompt = Console.ReadLine() ?? "";

            if (!RegexCheck.telephoneNumber(prompt))
            {
                Console.WriteLine($"\"{prompt}\" n'est pas un numéro de téléphone valide !");
            }

            else
            {
                Console.WriteLine("C'est bon!");
            }
        }

        public static void ValidPassword()
        {
            Console.WriteLine("Entrez un mot de passe : ");
            Console.WriteLine("(12 caractères minimum, au moins une minuscule, une majuscule, un chiffre et un caractère spécial ou ");
            Console.WriteLine("20 caractères minimum, au moins une minuscule, une majuscule et un chiffre)");
            prompt = Console.ReadLine() ?? "";

            if (!RegexCheck.password(prompt))
            {
                Console.WriteLine($"Le mot de passe \"{prompt}\" n'est pas valide !");
            }

            else
            {
                Console.WriteLine("C'est bon!");
            }
        }
    }
}
