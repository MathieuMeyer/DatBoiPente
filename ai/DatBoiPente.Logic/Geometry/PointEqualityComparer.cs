using System.Collections.Generic;

namespace DatBoiPente.Logic.Geometry
{
    public class PointEqualityComparer : EqualityComparer<Point>
    {
        public override bool Equals(Point a, Point b)
        {
            return a.X == b.X && a.Y == b.Y;
        }

        public override int GetHashCode(Point obj)
        {
            int hCode = obj.X ^ obj.Y;
            return hCode.GetHashCode();
        }
    }
}
