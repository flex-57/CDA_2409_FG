using ClassLibraryLepidoptere;

namespace ConsoleAppLepidoptere
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Lepidoptere lepido = new("space");
            Console.WriteLine(lepido);
            lepido.SeDeplacer();
            lepido.SeMetamorphoser();
            lepido.SeDeplacer();
            lepido.SeMetamorphoser();
            lepido.SeDeplacer();
            lepido.SeMetamorphoser();
            lepido.SeDeplacer();
            lepido.SeMetamorphoser();
        }
    }
}
