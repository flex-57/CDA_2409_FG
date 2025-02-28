namespace Bouteille
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Bouteille maBouteille = new()
                {
                    ContenanceEnLitre = 2
                };
                maBouteille.Ouvrir();

                Bouteille maBouteille2 = new(maBouteille);
                maBouteille2.Fermer();

                Bouteille maBouteille3 = new(1.5f, .75f, true);
                // maBouteille3.Fermer();

                maBouteille3.Remplir();

                maBouteille3.Vider();

                maBouteille3.Remplir(2f);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }
    }
}
