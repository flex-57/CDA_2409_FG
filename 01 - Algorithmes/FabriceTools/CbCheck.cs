namespace FabriceTools
{
    public class CbCheck
    {
        public static string algoLuhn(string _val)
        {

            char[] arrayVal = String.Concat(_val.Where(c => !Char.IsWhiteSpace(c))).ToCharArray();
            Array.Reverse(arrayVal);
            string s = new string(arrayVal);            

            foreach (char c in arrayVal)
            {
                if(s.IndexOf(c) % 2 == 0)
                {
                    if((c - '0') * 2 > 9)
                    {
                        int res = 0;
                        string ii = c.ToString();
                        foreach (char c2 in ii)
                        {
                            res += c2;
                        }
                        s = s.Replace(c, Char.Parse(res.ToString()));
                    }
                }
            }

            return s;
        }
    }
}
