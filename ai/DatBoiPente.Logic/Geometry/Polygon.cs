using System;
using System.Collections.Generic;
using System.Linq;

namespace DatBoiPente.Logic.Geometry
{
    public class Polygon
    {
        private List<Point> _edges;
        public List<Point> Edges => _edges;

        public Polygon(List<Point> edges)
        {
            this._edges = Polygon.RemoveUnneededEdgePoints(Polygon.JarvisMarch(edges.Distinct(new PointEqualityComparer()).ToList()));
        }

        public bool Contains(Point p)
        {
            bool doesContain = false;
            Point endPoint = this._edges[this._edges.Count - 1];

            int i = 0;
            while (i < this._edges.Count)
            {
                Point startPoint = endPoint;
                endPoint = this._edges[i++];
                doesContain ^= (endPoint.Y > p.Y ^ startPoint.Y > p.Y) && (p.X - endPoint.X < (p.Y - endPoint.Y) * (startPoint.X - endPoint.X) / (startPoint.Y - endPoint.Y));
            }

            return doesContain;
        }

        private static List<Point> JarvisMarch(List<Point> pointPool)
        {
            Point pointOnHull = pointPool[0];
            foreach (Point p in pointPool)
            {
                if (p.X < pointOnHull.X)
                    pointOnHull = p;
            }

            List<Point> sortedPoints = new List<Point>();
            Point endPoint;
            int i = 0;

            do
            {
                sortedPoints.Add(pointOnHull);
                endPoint = pointPool[0];
                for (int j = 1; j < pointPool.Count; j++)
                {
                    if (endPoint == pointOnHull ||
                        ((endPoint.X - sortedPoints[i].X) * (pointPool[j].Y - sortedPoints[i].Y) -
                         (endPoint.Y - sortedPoints[i].Y) * (pointPool[j].X - sortedPoints[i].X)) > 0)
                        endPoint = pointPool[j];
                }
                i++;
                pointOnHull = endPoint;
            } while (endPoint != sortedPoints[0]);

            return sortedPoints;
        }

        private static List<Point> RemoveUnneededEdgePoints(List<Point> edges)
        {
            Point a;
            Point b;
            Point p;

            List<Point> optimizedPoints = new List<Point>();

            for (int i = 0; i < edges.Count; i++)
            {
                int lastPointIndex = i - 1 < 0 ? edges.Count - 1 : i - 1;
                int nextPointIndex = i + 1 > edges.Count - 1 ? 0 : i + 1;

                a = edges[lastPointIndex];
                b = edges[nextPointIndex];
                p = edges[i];

                if (Math.Abs(Math.Sqrt(Math.Pow(b.X - a.X, 2) + Math.Pow(b.Y - a.Y, 2)) -
                             (Math.Sqrt(Math.Pow(p.X - a.X, 2) + Math.Pow(p.Y - a.Y, 2)) +
                              Math.Sqrt(Math.Pow(b.X - p.X, 2) + Math.Pow(b.Y - p.Y, 2)))) > 0.01)
                {
                    optimizedPoints.Add(p);
                }
            }

            return optimizedPoints;
        }
    }
}
