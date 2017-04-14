using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatBoiPente.Logic.Components;
using DatBoiPente.Logic.Geometry;

namespace DatBoiPente.Logic
{
    public class DecisionManager
    {
        public async Task<GameState.LastPlayed> TakeDecision(Game game)
        {
            //if (game.GameState.Turn == 0)
            //    return new GameState.LastPlayed(9, 9);

            GameState.LastPlayed decision = new GameState.LastPlayed(0, 0);

            Polygon assessablePolygon = DecisionManager.TraceAssessablePolygon(game.Board);
            foreach (BoardCell cell in game.Board.CellList)
            {
                if (cell.State == BoardCell.CellState.Free && assessablePolygon.Contains(new Point { X = cell.X, Y = cell.Y }))
                    DecisionManager.Minimax(game.Board, cell, 1, true);
            }

            return decision;
        }

        public static int Minimax(Board board, BoardCell targetedCell, int depth, bool maximisingPlayer)
        {
            Board evolvedBoard = (Board) board.Clone();
            evolvedBoard.Cells[targetedCell.X][targetedCell.Y] = targetedCell;

            if (depth == 0 || evolvedBoard.FreeCells == 0)
                return DecisionManager.Heuristic(evolvedBoard, targetedCell);

            Polygon assessablePolygon = DecisionManager.TraceAssessablePolygon(evolvedBoard);

            int bestValue;
            if (maximisingPlayer)
            {
                bestValue = -1000;
                foreach (BoardCell cell in evolvedBoard.CellList)
                {
                    if (cell.State == BoardCell.CellState.Free && assessablePolygon.Contains(new Point { X = cell.X, Y = cell.Y }))
                    {
                        int result = DecisionManager.Minimax(evolvedBoard, cell, depth - 1, false);
                        bestValue = Math.Max(bestValue, result);
                    }
                }
                return bestValue;
            }

            bestValue = 1000;
            foreach (BoardCell cell in evolvedBoard.CellList)
            {
                if (cell.State == BoardCell.CellState.Free && assessablePolygon.Contains(new Point { X = cell.X, Y = cell.Y }))
                {
                    int result = DecisionManager.Minimax(evolvedBoard, cell, depth - 1, true);
                    bestValue = Math.Min(bestValue, result);
                }
            }
            return bestValue;
        }

        private static Polygon TraceAssessablePolygon(Board board)
        {
            List<Point> assessementEdges = new List<Point>();

            foreach (BoardCell playerPiece in board.PlayerCells)
            {
                assessementEdges.Add(new Point
                {
                    X = Point.ClampCoordinate(playerPiece.X - 4, 0, Board.BoardHeight),
                    Y = Point.ClampCoordinate(playerPiece.Y - 4, 0, Board.BoardWidth)
                });

                assessementEdges.Add(new Point
                {
                    X = Point.ClampCoordinate(playerPiece.X - 4, 0, Board.BoardHeight),
                    Y = Point.ClampCoordinate(playerPiece.Y + 4, 0, Board.BoardWidth)
                });

                assessementEdges.Add(new Point
                {
                    X = Point.ClampCoordinate(playerPiece.X + 4, 0, Board.BoardHeight),
                    Y = Point.ClampCoordinate(playerPiece.Y - 4, 0, Board.BoardWidth)
                });

                assessementEdges.Add(new Point
                {
                    X = Point.ClampCoordinate(playerPiece.X + 4, 0, Board.BoardHeight),
                    Y = Point.ClampCoordinate(playerPiece.Y + 4, 0, Board.BoardWidth)
                });
            }

            return new Polygon(assessementEdges);
        }

        public static int Heuristic(Board evolvedBoard, BoardCell targetedCell)
        {
            // Horizontal
            List<Pattern> horizontalPatterns = new List<Pattern>();
            List<Pattern> verticalPatterns = new List<Pattern>();
            List<Pattern> diagonalOnePatterns = new List<Pattern>();
            List<Pattern> diagonalTwoPatterns = new List<Pattern>();

            for (int i = -5; i <= 0; i++)
            {
                BoardCell[] horizontal = new BoardCell[5];
                BoardCell[] vertical = new BoardCell[5];
                BoardCell[] diagonalOne = new BoardCell[5];
                BoardCell[] diagonalTwo = new BoardCell[5];

                for (int j = i; j <= i + 5; j++)
                {
                    if (Point.IsClamped(targetedCell.Y + j, 0, Board.BoardWidth))
                        horizontal[Math.Abs(j)] = evolvedBoard.Cells[targetedCell.X][targetedCell.Y + j];
                    if (Point.IsClamped(targetedCell.X + j, 0, Board.BoardWidth))
                        vertical[Math.Abs(j)] = evolvedBoard.Cells[targetedCell.X + j][targetedCell.Y];
                    if (Point.IsClamped(targetedCell.X + j, 0, Board.BoardWidth) && Point.IsClamped(targetedCell.Y + j, 0, Board.BoardWidth))
                        diagonalOne[Math.Abs(j)] = evolvedBoard.Cells[targetedCell.X + j][targetedCell.Y + j];
                    if (Point.IsClamped(targetedCell.X + j, 0, Board.BoardWidth) && Point.IsClamped(targetedCell.Y - j, 0, Board.BoardWidth))
                        diagonalTwo[Math.Abs(j)] = evolvedBoard.Cells[targetedCell.X + j][targetedCell.Y + j];
                }

                horizontalPatterns.Add(new Pattern(horizontal));
                verticalPatterns.Add(new Pattern(vertical));
                diagonalOnePatterns.Add(new Pattern(diagonalOne));
                diagonalTwoPatterns.Add(new Pattern(diagonalTwo));
            }

            return 0;
        }
    }
}