using FabriceTools;
internal class Program
{
    private static void Main(string[] args)
    {
        do
        {
            float A = ConsolePrompt.AskPositiveFloat("Veuillez entrer un premier nombre :");
            float B = ConsolePrompt.AskPositiveFloat("Veuillez entrer un deuxième nombre :");
            float C = ConsolePrompt.AskPositiveFloat("Veuillez entrer un troisième nombre :");

            float[] arrayNum =
            [
                A, B, C
            ];

            Array.Sort(arrayNum);

            Console.WriteLine(Environment.NewLine + "Valeurs triées dans l'ordre croissant :");

            foreach (float i in arrayNum)
            {
                Console.WriteLine(i);
            }
        }
        while (ConsolePrompt.TryAgain());
    }
}