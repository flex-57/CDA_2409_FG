using FabriceTools;

namespace Validations
{
    public class IsValid
    {
        public static bool ValidCreditCard()
        {
            string prompt;
            bool isOk;


                Console.WriteLine("Entrez un numéro de CB : ");
                prompt = Console.ReadLine() ?? "";

                isOk = RegexCheck.creditCard(prompt) && CbCheck.algoLuhn(prompt);

                if (!isOk)
                {
                    Console.WriteLine("Numéro de carte de crédit invalide, recommencez !");
                    return false;
                }

                else
                {
                    Console.WriteLine("Numéro de carte de crédit valide, nous espérons que votre carte est pleine !");
                    return true;
                }
            
        }

        public static bool ValidTelephoneNumber()
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
