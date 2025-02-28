namespace ClassLibraryLepidoptere
{
    public class Chrysalide : StadeEvolution
    {
        public Chrysalide() { }

        public override void SeDeplacer()
        {
            Console.WriteLine("Je ne me déplace pas, moi, je suis une chrysalide. Patate!!!");
        }

        public override StadeEvolution SeMetamorphoser()
        {
            return new Papillon();
        }
    }
}
