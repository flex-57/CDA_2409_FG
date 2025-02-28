namespace ClassLibraryLepidoptere
{
    public class Papillon : StadeEvolution
    {
        public Papillon() { }

        public override void SeDeplacer()
        {
            Console.WriteLine("Ok, je vole car je suis un papillon!");
        }

        public override StadeEvolution SeMetamorphoser()
        {
            Console.WriteLine("Je suis un papillon, en quoi veux-tu que je me transforme? Banane!!!");
            return this;
        }
    }
}
