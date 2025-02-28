namespace ClassLibraryLepidoptere
{
    public class Chenille : StadeEvolution
    {
        public Chenille() { }

        public override void SeDeplacer()
        {
            Console.WriteLine("Ok, je rampe car je suis une chenille!");
        }

        public override StadeEvolution SeMetamorphoser()
        {
            return new Chrysalide();
        }
    }
}
