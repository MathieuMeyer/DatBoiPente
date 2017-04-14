using System.Collections.Generic;
using DatBoiPente.Logic.Components;

namespace DatBoiPente.Logic
{
    public class NodeManager
    {
        public static BoardCell[][] GetAssessableNodes(Board board)
        {
            return SelectAssessableBoard(board.PlayerCells);
        }

        private static BoardCell[][] SelectAssessableBoard(List<BoardCell> playerCells)
        {
            BoardCell[][] assessableBoard = new BoardCell[Board.BoardHeight][];

            foreach (BoardCell playerCell in playerCells)
            {
                
            }

            return assessableBoard;
        }


    }
}
