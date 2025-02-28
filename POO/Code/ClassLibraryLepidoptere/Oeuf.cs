namespace ClassLibraryLepidoptere
{
    public class Oeuf : StadeEvolution
    {
        public Oeuf() { }

        public override void SeDeplacer()
        {
            Console.WriteLine("Je ne me déplace pas, moi, je suis un oeuf. Patate!!!");
        }

        public override StadeEvolution SeMetamorphoser()
        {
            return new Chenille();
        }
    }
}
