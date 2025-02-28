namespace ClassLibraryLepidoptere
{
    public class Lepidoptere
    {
        private StadeEvolution stadeCourant;
        private readonly string espece;

        public Lepidoptere(string _espece) { 
            espece = _espece;
            stadeCourant = new Oeuf();
        }

        public void SeDeplacer()
        {
            stadeCourant.SeDeplacer();
        }

        public void SeMetamorphoser()
        {
            stadeCourant = stadeCourant.SeMetamorphoser();
        }

        public override string ToString() { 
            return $"Bonjour! Je suis un lépidoptère de type '{espece}'!";
        }
    }
}
