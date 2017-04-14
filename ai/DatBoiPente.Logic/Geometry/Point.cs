namespace DatBoiPente.Logic.Geometry
{
    public class Point
    {
        public int X { get; set; }
        public int Y { get; set; }

        public static int ClampCoordinate(int val, int lowerBound, int upperBound)
        {
            if (val.CompareTo(lowerBound) < 0) return lowerBound;
            if (val.CompareTo(upperBound) > 0) return upperBound;
            return val;
        }

        public static bool IsClamped(int val, int lowerBound, int upperBound)
        {
            if (val.CompareTo(lowerBound) < 0) return false;
            if (val.CompareTo(upperBound) > 0) return false;
            return true;
        }
    }
}
