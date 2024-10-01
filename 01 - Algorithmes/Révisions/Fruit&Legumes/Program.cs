using System.Text.RegularExpressions;

namespace Fruit_Legumes
{
    internal class Program
    {
        //const string pattern = @"^([a-z -]+) (\d+.?\d*)$";
        static void Main(string[] args)
        {
            string prompt = "";
            string fruitAndPrice = "";
            string[] fruitsAndPrices;
            
            string[] prices;

            do
            {
                Console.WriteLine("Veuillez entrer un légume et son prix au kilo :");

                prompt = Console.ReadLine();
                
                if (prompt == "")
                {
                    Console.WriteLine("Seulement un légume et son prix au kilo !");
                }
                
                if (prompt != "go")
                {
                    fruitAndPrice += prompt + ",";
                }
            }
            while (prompt != "go");



            fruitsAndPrices = fruitAndPrice.Split(",");
            
            string[][] fap = new string[fruitsAndPrices.Length][];

            int i = 0;
            string[] f;
            foreach (string items in fruitsAndPrices)
            {
                f= items.Split(" ");
                fap[i] = new string[f.Length];
                
                foreach (string item in fap[i])
                {
                  
                    
                        Console.WriteLine(item);
                    
                }
                i++;
            }
            
            
        }
    }
}




                /*
                string[] fpArray = fruitAndPrice.Split(" ");
                string[] fruits = new string[fpArray.Length];
                int[] prices = new int[fpArray.Length];
                */
                








                /*
                try
                {
                    foreach (Match match in Regex.Matches(fruitAndPrice, pattern, RegexOptions.IgnoreCase))
                    {
                        Console.WriteLine("value : {0}; Index: {1}", match.Value, match.Index);
                        Console.WriteLine("ok");
                    }
                }

                catch (RegexMatchTimeoutException)
                {
                    Console.WriteLine("Pas ok");

                }
                */
            
