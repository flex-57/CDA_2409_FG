namespace Jalon
{
    public class Card
    {
        public string user { get; set; }
        public int fonds {  get; set; }

        public int alimenterCard(int _val)
        {
            return fonds += Math.Abs(_val);
        }

        public int Payer(int _val)
        {
            return fonds -= _val;
        }
    }
}
