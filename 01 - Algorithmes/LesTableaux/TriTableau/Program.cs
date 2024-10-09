namespace TriTableau
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] array = [128, 64, 8, 512, 16, 32, 256, -555];
            int tempo = 0;
            int index = 0;

            Console.WriteLine("Voici le tableau non-trié :");

            foreach (int num in array)
            {
                Console.Write($"{num} ");
            }

            Console.WriteLine();

            for (int i = 0; i < array.Length; i++)
            {
                index = i;

                for (int j = i; j < array.Length; j++)
                {
                    if (array[index] > array[j])
                    {
                        index = j;
                    }
                }
                tempo = array[index];
                array[index] = array[i];
                array[i] = tempo;
                tempo = 0;
            }

            Console.WriteLine("Voici le tableau trié :");
            
            foreach (int num in array)
            {
                Console.Write($"{num} ");
            }
        }   
    }
}
