namespace TriTableau
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int tempo = 0;
            int[] array = [128, 64, 8, 512, 16, 32, 256];
            int index = 0;

            for (int j = 0; j < array.Length - 1; j++)
            {
                index = j;

                for (int i = j; i < array.Length; i++)
                {
                    if (array[index] > array[i])
                    {
                        index = i;
                    }
                }
                tempo = array[index];
                array[index] = array[j];
                array[j] = tempo;
                tempo = 0;
            }
            Console.WriteLine(tempo);

        }   
        
    }
}
