using FabriceTools;
using System.Text.RegularExpressions;

namespace Fruit_Legumes
{
    internal class Program
    {
        const string pattern = @"^([a-zA-Z\s]+)\s+(\d+(\.\d{1,2})?)$"; 

        static void Main(string[] args)
        {
            string fruitAndPrice = "";
            string prompt;

            do
            {
                Console.WriteLine("Veuillez entrer un légume et son prix au kilo ou \"go\" pour terminer :");
                prompt = Console.ReadLine();

                if (!string.IsNullOrWhiteSpace(prompt) && prompt != "go")
                {
                    fruitAndPrice += prompt + ","; 
                }
            }
            while (prompt != "go");

            if (fruitAndPrice.Length > 0)
            {
                fruitAndPrice = fruitAndPrice.TrimEnd(',');
            }

           
            MatchCollection matches = Regex.Matches(fruitAndPrice, pattern);

 
            string[] vegetables = new string[matches.Count];
            double[] prices = new double[matches.Count];

            for (int i = 0; i < matches.Count; i++)
            {
                vegetables[i] = matches[i].Groups[1].Value;
                prices[i] = double.Parse(matches[i].Groups[2].Value);
                Console.WriteLine($"Légume: {vegetables[i]}, Prix: {prices[i]} euros");
            }

            if (prices.Length > 0)
            {
                double minPrice = prices[0];
                string cheapestVegetable = vegetables[0];

                for (int i = 1; i < prices.Length; i++)
                {
                    if (prices[i] < minPrice)
                    {
                        minPrice = prices[i];
                        cheapestVegetable = vegetables[i];
                    }
                }

                Console.WriteLine($"Légume le moins cher au kilo : {cheapestVegetable} à {minPrice} euros.");
            }
        }
    }
}
