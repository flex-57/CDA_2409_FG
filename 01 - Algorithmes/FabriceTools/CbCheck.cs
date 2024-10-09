namespace FabriceTools
{
    public class CBCheck
    {
        public static bool algoLuhn(string _val)
        {

            char[] arrayVal = String.Concat(_val.Where(c => !Char.IsWhiteSpace(c))).ToCharArray();
            Array.Reverse(arrayVal);

            int sum = 0;

            for (int i = 0; i < arrayVal.Length; i++)
            {
                int digit = arrayVal[i] - '0'; 

                if (i % 2 != 0) 
                {
                    digit *= 2;

                    if (digit > 9) 
                    {
                        digit -= 9;
                    }
                }

                sum += digit;
            }

            return sum % 10 == 0;
        }
    }
}
