using FabriceTools;

namespace Validations
{
    internal class Program
    {
        
        static void Main(string[] args)
        {
            char s;
            do
            {
                Console.WriteLine("Choisissez une option :");

                Console.WriteLine("1. Vérifiez un numéro de CB");
                Console.WriteLine("2. Vérifiez un numéro de téléphone");
                Console.WriteLine("3. Vérifiez un mot de passe");

                s = Console.ReadKey(true).KeyChar;

                switch(s)
                {
                    case '1':
                        IsValid.ValidCreditCard();
                        break;
                    case '2':
                        IsValid.ValidTelephoneNumber();
                        break;
                    case '3':
                        IsValid.ValidPassword();
                        break;
                }
      
            }
            while (s != '6');
        }
    }
}
