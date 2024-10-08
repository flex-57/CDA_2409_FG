using FabriceTools;

namespace Validations
{
    public class isValid
    {
        static bool ValidCreditCard()
        {
            do
            {
                Console.WriteLine("Entrez votre numéro de CB :");
                string inputCB = Console.ReadLine() ?? "";

                if (!RegexCheck.creditCard(inputCB))
                {
                    Console.WriteLine($"\"{inputCB}\" n'est pas un numéro de carte valide !");
                    return false;
                }

                else
                {
                    Console.WriteLine("C'est bon! Nous espérons que votre CB est pleine !");
                    return true;
                }
            }
            while (ConsolePrompt.TryAgain());
        }
        static bool ValidTelephoneNumber()
        {
            do
            {
                Console.WriteLine("Entrez votre numéro de téléphone :");
                string inputTel = Console.ReadLine() ?? "";

                if (!RegexCheck.telephoneNumber(inputTel))
                {
                    Console.WriteLine($"\"{inputTel}\" n'est pas un numéro de téléphone valide !");
                    return false;
                }

                else
                {
                    Console.WriteLine("C'est bon!");
                    return true;
                }
            }
            while (ConsolePrompt.TryAgain());
        }
    }
}
